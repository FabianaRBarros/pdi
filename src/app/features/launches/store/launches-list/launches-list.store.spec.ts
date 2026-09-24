import { TestBed } from '@angular/core/testing'
import { of, throwError } from 'rxjs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LaunchPartial } from '../../models/launch.model'
import { LaunchesListStore } from './launches-list.store'
import { LaunchesListStoreService } from './launches-list.store.service'

describe('LaunchesListStore', () => {
  let store: InstanceType<typeof LaunchesListStore>
  let mockLaunchService: { getPastLaunches: ReturnType<typeof vi.fn> }

  const mockLaunches: LaunchPartial[] = [
    { missionName: 'Falcon 1' } as LaunchPartial,
    { missionName: 'Falcon 9' } as LaunchPartial,
    { missionName: 'Falcon Heavy' } as LaunchPartial,
    { missionName: 'Starship' } as LaunchPartial,
  ]

  beforeEach(() => {
    mockLaunchService = {
      getPastLaunches: vi.fn(),
    }

    TestBed.configureTestingModule({
      providers: [
        LaunchesListStore,
        { provide: LaunchesListStoreService, useValue: mockLaunchService },
      ],
    })

    store = TestBed.inject(LaunchesListStore)
  })

  it('should have initial state set correctly', () => {
    expect(store.launches()).toEqual([])
    expect(store.isLoading()).toBe(false)
    expect(store.error()).toBeNull()
    expect(store.filter()).toEqual({ query: '', page: 1, pageSize: 12 })
    expect(store.launchesCount()).toBe(0)
    expect(store.pagesCount()).toBe(0)
    expect(store.isLastPage()).toBe(true)
  })

  describe('loadLaunches (rxMethod)', () => {
    it('should load launches successfully and update state', () => {
      mockLaunchService.getPastLaunches.mockReturnValue(of(mockLaunches))
      store.loadLaunches()

      expect(store.launches()).toEqual(mockLaunches)
      expect(store.launchesCount()).toBe(4)
      expect(store.isLoading()).toBe(false)
      expect(store.error()).toBeNull()
    })

    it('should handle errors correctly when API fails', () => {
      const mockError = new Error('API Execution Failed')
      mockLaunchService.getPastLaunches.mockReturnValue(throwError(() => mockError))

      store.loadLaunches()

      expect(store.launches()).toEqual([])
      expect(store.error()).toEqual(mockError)
      expect(store.isLoading()).toBe(false)
    })
  })

  describe('Computed Filtering and Pagination', () => {
    beforeEach(() => {
      mockLaunchService.getPastLaunches.mockReturnValue(of(mockLaunches))
      store.loadLaunches()
      store.setPageSize(2)

      expect(store.launches()).toEqual(mockLaunches)
      expect(store.launchesCount()).toBe(4)
      expect(store.isLoading()).toBe(false)
      expect(store.error()).toBeNull()
    })

    it('should correctly calculate total pages count', () => {
      expect(store.pagesCount()).toBe(2)
    })

    it('should filter items by search term reactively', () => {
      store.searchLaunchByTerm('Heavy')

      expect(store.filteredLaunches().length).toBe(1)
      expect(store.filteredLaunches()[0].missionName).toBe('Falcon Heavy')
      expect(store.filter().page).toBe(1)
    })

    it('should increment page via getNextPage if pages are available', () => {
      expect(store.filter().page).toBe(1)
      expect(store.isLastPage()).toBe(false)

      store.getNextPage()

      expect(store.filter().page).toBe(2)
      expect(store.isLastPage()).toBe(true)
    })

    it('should not increment page beyond the last page boundary', () => {
      store.getNextPage()
      expect(store.filter().page).toBe(2)

      store.getNextPage()

      expect(store.filter().page).toBe(2)
    })

    it('should slice data based on cumulative pagination (infinite scroll style)', () => {
      expect(store.filteredLaunches().length).toBe(2)

      store.getNextPage()

      expect(store.filteredLaunches().length).toBe(4)
    })
  })
})
