import { Routes } from '@angular/router'
import { LaunchDetailsContainer } from './containers/launch-details/launch-details.container'
import { LaunchesListContainer } from './containers/launches-list/launches-list.container'

export const routes: Routes = [
  { path: '', component: LaunchesListContainer, pathMatch: 'full' },
  { path: ':id', component: LaunchDetailsContainer, pathMatch: 'full' },
]
