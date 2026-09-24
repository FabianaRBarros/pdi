import { Routes } from '@angular/router';
import { LaunchesListContainer } from './containers/launches-list/launches-list.container'

export const routes: Routes = [
      { path: "", component: LaunchesListContainer, pathMatch: "full" },
];
