import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LaunchAPI } from '../../models/launch.api.model'
import { LaunchFactory } from '../../models/launch.factory'
import { Launch } from '../../models/launch.model'
import { LaunchStoreService } from './launch.store.service'

describe('LaunchStoreService', () => {
  let service: LaunchStoreService
  let httpMock: HttpTestingController

  const mockApiLaunches: LaunchAPI[] = [
    { flight_number: 101, mission_name: 'Falcon 9' } as unknown as LaunchAPI,
    { flight_number: 102, mission_name: 'Falcon Heavy' } as unknown as LaunchAPI,
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaunchStoreService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })

    service = TestBed.inject(LaunchStoreService)
    httpMock = TestBed.inject(HttpTestingController)
    vi.useFakeTimers()
  })

  afterEach(() => {
    httpMock.verify()
    vi.useRealTimers()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should find a launch by id, and apply factory transformation', () => {
    const expectedModel = { id: '101', missionName: 'Falcon 9' } as Launch
    const factorySpy = vi.spyOn(LaunchFactory, 'createLaunchFromAPI').mockReturnValue(expectedModel)

    let result: Launch | null = null

    service.getLaunchById('101').subscribe((response) => {
      result = response
    })

    const req = httpMock.expectOne('data/launches.json')
    expect(req.request.method).toBe('GET')

    req.flush(mockApiLaunches)

    vi.advanceTimersByTime(300)

    expect(result).toEqual(expectedModel)
    expect(factorySpy).toHaveBeenCalledWith(mockApiLaunches[0])
  })

  it('should return null if the launch id does not exist in the collection', () => {
    let result: Launch | null = null

    service.getLaunchById('999').subscribe((response) => {
      result = response
    })

    const req = httpMock.expectOne('data/launches.json')
    req.flush(mockApiLaunches)

    vi.advanceTimersByTime(300)

    expect(result).toBeNull()
  })
})
