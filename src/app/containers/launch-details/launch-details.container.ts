import { Component, input } from '@angular/core'
import { LaunchDetailsComponent } from '../../features/launches/components/launch-details/launch-details.component'

@Component({
  selector: 'app-launch-details-wrapper',
  imports: [
    LaunchDetailsComponent,
  ],
  templateUrl: './launch-details.container.html',
  styleUrl: './launch-details.container.scss',
})
export class LaunchDetailsContainer {
  launchId = input.required<string>()
}
