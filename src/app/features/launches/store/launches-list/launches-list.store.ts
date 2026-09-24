import { computed, inject } from '@angular/core'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs'
import { LaunchPartial } from '../../models/launch.model'
import { LaunchesListStoreService } from './launches-list.store.service'

type LaunchSearchState = {
  launches: LaunchPartial[];
  isLoading: boolean;
  error: Error | null;
  filter: { query: string; page: number; pageSize: number };
};

const initialState: LaunchSearchState = {
  launches: [],
  isLoading: false,
  error: null,
  filter: { query: '', page: 1, pageSize: 12 },
}

export const LaunchesListStore = signalStore(
  withState(initialState),
  withComputed((store) => {
      const localFilteredLaunches = computed(() => {
        const { query } = store.filter()
        const term = query.trim().toLowerCase()

        return term
          ? store.launches().filter(launch => launch.missionName.toLowerCase().includes(term))
          : store.launches()
      })

      return {
        launchesCount: computed(() => store.launches().length),
        pagesCount: computed(() => Math.ceil(localFilteredLaunches().length / store.filter.pageSize())),
        filteredLaunches: computed(() => {
          const { page, pageSize } = store.filter()

          const startAt = (page - 1) * pageSize
          const endAt = startAt + pageSize

          return localFilteredLaunches().slice(0, endAt)
        }),
        isLastPage: computed(() => {
          return store.filter.page() >= Math.ceil(localFilteredLaunches().length / store.filter.pageSize())
        }),
      }
    },
  ),
  withMethods((store) => {
    const launchService = inject(LaunchesListStoreService)

    return {
      setPageSize(size: number): void {
        patchState(store, (state) => ({
          filter: { ...state.filter, pageSize: size },
        }))
      },
      searchLaunchByTerm(query: string): void {
        patchState(store, (state) => ({
          filter: { ...state.filter, query, page: 1 },
        }))
      },
      getNextPage(): void {
        if (!store.isLastPage()) {
          patchState(store, (state) => ({
            filter: { ...state.filter, page: state.filter.page + 1 },
          }))
        }
      },
      loadLaunches: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            launchService.getPastLaunches().pipe(
              tapResponse({
                next: (launches) => patchState(store, { launches }),
                error: (error) => patchState(store, { error: error as Error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      ),
    }
  }),
)