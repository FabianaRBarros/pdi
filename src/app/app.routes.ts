import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./containers/launches-list/launches-list.container')
      .then(m => m.LaunchesListContainer),
  },
  {
    path: 'launch/:launchId',
    pathMatch: 'full',
    loadComponent: () => import('./containers/launch-details/launch-details.container')
      .then(m => m.LaunchDetailsContainer),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
]
