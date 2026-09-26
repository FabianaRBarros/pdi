import { TestBed } from '@angular/core/testing'
import { of, Subject, throwError } from 'rxjs'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { Launch } from '../../models/launch.model'
import { LaunchStore } from './launch.store'
import { LaunchStoreService } from './launch.store.service'

describe('LaunchStore', () => {
  let mockLaunchService: {
    getLaunchById: Mock;
  }
  let store: InstanceType<typeof LaunchStore>

  const mockLaunchPayload = {
    id: 'launch-abc',
    missionName: 'Crew-6',
    flightNumber: 105,
    launchDate: '2026-03-02',
    success: true,
  } as unknown as Launch

  beforeEach(() => {
    mockLaunchService = {
      getLaunchById: vi.fn(),
    }

    TestBed.configureTestingModule({
      providers: [
        LaunchStore,
        { provide: LaunchStoreService, useValue: mockLaunchService },
      ],
    })

    store = TestBed.inject(LaunchStore)
  })

  it('should initialize with default baseline state values', () => {
    expect(store.launch()).toBeNull()
    expect(store.isLoading()).toBe(false)
    expect(store.error()).toBeNull()
  })

  it('should set isLoading to true and reset states when loadLaunches is triggered', () => {
    const triggerSubject = new Subject<Launch>()
    mockLaunchService.getLaunchById.mockReturnValue(triggerSubject)
    store.loadLaunches('launch-abc')

    expect(store.isLoading()).toBe(true)

    triggerSubject.complete()

    expect(store.isLoading()).toBe(false)
  })

  it('should successfully store the fetched launch item and turn off isLoading', () => {
    mockLaunchService.getLaunchById.mockReturnValue(of(mockLaunchPayload))

    store.loadLaunches('launch-abc')

    expect(store.launch()).toEqual(mockLaunchPayload)
    expect(store.isLoading()).toBe(false)
    expect(store.error()).toBeNull()
    expect(mockLaunchService.getLaunchById).toHaveBeenCalledWith('launch-abc')
  })

  it('should capture and assign the error payload when the service stream breaks', () => {
    const mockError = new Error('Failed to fetch from API')
    mockLaunchService.getLaunchById.mockReturnValue(throwError(() => mockError))

    store.loadLaunches('invalid-id')

    expect(store.launch()).toBeNull()
    expect(store.isLoading()).toBe(false)
    expect(store.error()).toEqual(mockError)
  })
})
