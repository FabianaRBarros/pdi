import { TestBed } from '@angular/core/testing'
import { FavoriteLaunchStore } from './favorite-launch.store'

describe('FavoriteLaunchStore', () => {
  const LOCAL_STORAGE_KEY = 'favorite_launches_ids'

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  function setupStore() {
    TestBed.configureTestingModule({
      providers: [FavoriteLaunchStore],
    })
    return TestBed.inject(FavoriteLaunchStore)
  }

  it('should initialize with an empty favorites list', () => {
    const store = setupStore()
    expect(store.favoriteLaunchesIds()).toEqual([])
  })

  it('should add an ID to favorites using toggleFavorite', () => {
    const store = setupStore()

    store.toggleFavorite('launch-1')

    expect(store.favoriteLaunchesIds()).toEqual(['launch-1'])
    expect(store.isFavorite()('launch-1')).toBe(true)
  })

  it('should remove an ID from favorites if it already exists when calling toggleFavorite', () => {
    const store = setupStore()

    store.toggleFavorite('launch-1')
    store.toggleFavorite('launch-2')
    store.toggleFavorite('launch-1') // Removes the first one

    expect(store.favoriteLaunchesIds()).toEqual(['launch-2'])
    expect(store.isFavorite()('launch-1')).toBe(false)
    expect(store.isFavorite()('launch-2')).toBe(true)
  })

  it('should save changes to localStorage automatically', () => {
    const store = setupStore()

    store.toggleFavorite('launch-100')

    // Forces pending effects (localStorage) to run immediately
    TestBed.tick()

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    expect(saved).toBe(JSON.stringify(['launch-100']))
  })

  it('should load existing favorites from localStorage on initialization', () => {
    const mockIds = ['saved-1', 'saved-2']
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockIds))

    const store = setupStore()

    expect(store.favoriteLaunchesIds()).toEqual(mockIds)
    expect(store.isFavorite()('saved-1')).toBe(true)
  })

  it('should clear localStorage if the saved data is invalid JSON', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'corrupted-invalid-string-not-json')

    const store = setupStore()

    expect(store.favoriteLaunchesIds()).toEqual([])
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull()
  })
})
