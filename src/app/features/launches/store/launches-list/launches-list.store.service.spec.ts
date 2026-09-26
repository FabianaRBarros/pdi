import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LaunchAPI } from '../../models/launch.api.model'
import { LaunchFactory } from '../../models/launch.factory'
import { LaunchPartial } from '../../models/launch.model'
import { LaunchesListStoreService } from './launches-list.store.service'

describe('LaunchesListStoreService', () => {
  let service: LaunchesListStoreService
  let httpMock: HttpTestingController

  const mockApiResponse: LaunchAPI[] = [
    { mission_name: 'Falcon 1', flight_number: 1 } as unknown as LaunchAPI,
    { mission_name: 'Falcon 9', flight_number: 2 } as unknown as LaunchAPI,
  ]

  const mockParsedLaunches: LaunchPartial[] = [
    { missionName: 'Falcon 1' } as LaunchPartial,
    { missionName: 'Falcon 9' } as LaunchPartial,
  ]

  beforeEach(() => {
    // We need this because of the temporary delay(300)
    vi.useFakeTimers()

    vi.spyOn(LaunchFactory, 'createLaunchPartialFromAPI')
      .mockImplementation(() => mockParsedLaunches[0])

    TestBed.configureTestingModule({
      providers: [
        LaunchesListStoreService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })

    service = TestBed.inject(LaunchesListStoreService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
    vi.useRealTimers()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should fetch past launches, apply delay, and map items using LaunchFactory', () => {
    let result: LaunchPartial[] | undefined

    service.getPastLaunches().subscribe((launches) => {
      result = launches
    })

    const req = httpMock.expectOne('data/launches.json')
    expect(req.request.method).toBe('GET')
    req.flush(mockApiResponse)

    expect(result).toBeUndefined()

    vi.advanceTimersByTime(300)

    expect(result).toBeDefined()
    expect(LaunchFactory.createLaunchPartialFromAPI).toHaveBeenCalledTimes(2)
  })

  it('should propagate errors correctly if the HTTP request fails', () => {
    let errorMessage: string | undefined

    service.getPastLaunches().subscribe({
      next: () => {
      },
      error: (err) => {
        errorMessage = err.statusText
      },
    })

    const req = httpMock.expectOne('data/launches.json')
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' })

    vi.advanceTimersByTime(300)

    expect(errorMessage).toBe('Internal Server Error')
  })
})
