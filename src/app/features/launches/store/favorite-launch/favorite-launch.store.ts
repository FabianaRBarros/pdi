import { computed, effect } from '@angular/core'
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

const LOCAL_STORAGE_KEY = 'favorite_launches_ids'

type FavoriteLaunchesState = {
  favoriteLaunchesIds: string[];
};

const initialState: FavoriteLaunchesState = {
  favoriteLaunchesIds: [],
}

export const FavoriteLaunchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isFavorite: computed(() => (id: string) => store.favoriteLaunchesIds().includes(id)),
  })),
  withMethods((store) => ({
    toggleFavorite(id: string): void {
      const currentIds = store.favoriteLaunchesIds()
      const isFavorite = currentIds.includes(id)

      const updatedIds = isFavorite
        ? currentIds.filter((favId) => favId !== id)
        : [...currentIds, id]

      patchState(store, { favoriteLaunchesIds: updatedIds })
    },
  })),
  withHooks({
    onInit(store) {
      const savedIds = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedIds) {
        try {
          patchState(store, { favoriteLaunchesIds: JSON.parse(savedIds) })
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
      }

      effect(() => {
        const ids = store.favoriteLaunchesIds()
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids))
      })
    },
  }),
)