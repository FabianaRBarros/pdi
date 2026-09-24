import { Component } from "@angular/core";
import { LaunchesListComponent } from '../../features/launches/components/launches-list/launches-list.component'

@Component({
  selector: "app-launches-list-wrapper",
  imports: [LaunchesListComponent],
  templateUrl: "./launches-list.container.html",
  styleUrl: "./launches-list.container.scss",
})
export class LaunchesListContainer {}
