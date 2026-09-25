import { inject } from '@angular/core'
import { tapResponse } from '@ngrx/operators'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs'
import { Launch } from '../../models/launch.model'
import { LaunchStoreService } from './launch.store.service'

type LaunchState = {
  launch: Launch | null;
  isLoading: boolean;
  error: Error | null;
};

const initialState: LaunchState = {
  launch: null,
  isLoading: false,
  error: null
};

export const LaunchStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const launchService = inject(LaunchStoreService);

    return {
      loadLaunches: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null, launch: null })),
          switchMap((id) => {
            return launchService.getLaunchById(id).pipe(
              tapResponse({
                next: (launch) => patchState(store, { launch }),
                error: (error) => patchState(store, { error: error as Error }),
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),
    };
  })
);