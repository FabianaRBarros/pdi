import { Component, input, signal } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { LaunchPartial } from '../../models/launch.model'
import { LaunchesListStore } from '../../store/launches-list/launches-list.store'
import { LaunchesListStoreService } from '../../store/launches-list/launches-list.store.service'
import { LaunchesListComponent } from './launches-list.component'

@Component({ selector: 'app-input', standalone: true, template: '' })
class MockInputComponent {
  label = input<string>()
  inputType = input<string>()
  placeholder = input<string>()
}

@Component({ selector: 'app-launch-card', standalone: true, template: '' })
class MockLaunchCardComponent {
  launch = input.required<LaunchPartial>()
}

@Component({ selector: 'app-loading-skeleton', standalone: true, template: '' })
class MockLoadingSkeletonComponent {
  shape = input<string>()
  width = input<string>()
  height = input<string>()
}

@Component({ selector: 'app-empty-state', standalone: true, template: '' })
class MockEmptyStateComponent {
  title = input<string>()
  iconName = input<string>()
}

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent
  let fixture: ComponentFixture<LaunchesListComponent>

  let mockFilteredLaunches = signal<LaunchPartial[]>([])
  let mockIsLoading = signal<boolean>(false)
  let mockError = signal<Error | null>(null)
  let mockIsLastPage = signal<boolean>(false)

  let mockStore: {
    filteredLaunches: typeof mockFilteredLaunches;
    isLoading: typeof mockIsLoading;
    error: typeof mockError;
    isLastPage: typeof mockIsLastPage;
    loadLaunches: Mock;
    getNextPage: Mock;
    searchLaunchByTerm: Mock;
  }

  beforeEach(async () => {
    vi.useFakeTimers()
    mockFilteredLaunches.set([])
    mockIsLoading.set(false)
    mockError.set(null)
    mockIsLastPage.set(false)

    mockStore = {
      filteredLaunches: mockFilteredLaunches,
      isLoading: mockIsLoading,
      error: mockError,
      isLastPage: mockIsLastPage,
      loadLaunches: vi.fn(),
      getNextPage: vi.fn(),
      searchLaunchByTerm: vi.fn(),
    }

    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent, ReactiveFormsModule, InfiniteScrollDirective, MockInputComponent, MockLaunchCardComponent, MockLoadingSkeletonComponent, MockEmptyStateComponent],
    })
      .overrideComponent(LaunchesListComponent, {
        set: {
          providers: [
            { provide: LaunchesListStore, useValue: mockStore },
            { provide: LaunchesListStoreService, useValue: {} }, // Empty dummy mock object since it's consumed inside the real store
          ],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(LaunchesListComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize and call loadLaunches immediately on creation', () => {
    // fixture.detectChanges(); // Triggers ngOnInit
    expect(mockStore.loadLaunches).toHaveBeenCalledTimes(1)
  })

  it('should display loading skeletons when store isLoading state is true', () => {
    mockIsLoading.set(true)
    fixture.detectChanges()

    const skeletons = fixture.debugElement.queryAll(By.css('app-loading-skeleton'))
    expect(skeletons.length).toBeGreaterThanOrEqual(1)
    expect(fixture.debugElement.query(By.css('.launches-grid'))).toBeNull()
  })

  it('should render an error empty-state message if store contains an exception payload', () => {
    mockIsLoading.set(false)
    mockError.set(new Error('Network Failure'))
    fixture.detectChanges()

    const emptyStateEl = fixture.debugElement.query(By.css('app-empty-state'))
    expect(emptyStateEl).toBeTruthy()
    expect(emptyStateEl.componentInstance.title()).toBe('Network Failure')
  })

  it('should loop and render launch cards accurately when items populate the state', () => {
    const fakeItems: LaunchPartial[] = [
      {
        id: '1',
        missionName: 'Falcon 9',
        flightNumber: 101,
        launchDate: new Date('2026'),
        success: true,
        imageUrl: '',
        imageFallbackUrl: '',
      },
      {
        id: '2',
        missionName: 'Falcon Heavy',
        flightNumber: 102,
        launchDate: new Date('2026'),
        success: true,
        imageUrl: '',
        imageFallbackUrl: '',
      },
    ]
    mockFilteredLaunches.set(fakeItems)
    fixture.detectChanges()

    const cards = fixture.debugElement.queryAll(By.css('app-launch-card'))
    expect(cards.length).toBe(2)
    expect(cards[0].componentInstance.launch()).toEqual(fakeItems[0])
  })

  it('should debounce and filter results via store when term changes are supplied', fakeAsync(() => {
    // fixture.detectChanges(); // Triggers ngOnInit subscription pipeline

    component.searchForm.patchValue({ term: 'Crew-1' })
    fixture.detectChanges()

    // Verify it is withheld during active debounce delay windows
    expect(mockStore.searchLaunchByTerm).not.toHaveBeenCalled()

    tick(300) // Step time past the 300ms configuration threshold

    expect(mockStore.searchLaunchByTerm).toHaveBeenCalledWith('Crew-1')
  }))

  it('should request the next index page upon scroll triggers if current index is not the last page', () => {
    mockIsLastPage.set(false)
    fixture.detectChanges()

    const scrollContainer = fixture.debugElement.query(By.directive(InfiniteScrollDirective))
    scrollContainer.triggerEventHandler('scrolled', null)

    expect(mockStore.getNextPage).toHaveBeenCalledTimes(1)
  })

  it('should bypass calling getNextPage entirely on scroll if last page boundary has been captured', () => {
    mockIsLastPage.set(true)
    fixture.detectChanges()

    const scrollContainer = fixture.debugElement.query(By.directive(InfiniteScrollDirective))
    scrollContainer.triggerEventHandler('scrolled', null)

    expect(mockStore.getNextPage).not.toHaveBeenCalled()
  })
})
