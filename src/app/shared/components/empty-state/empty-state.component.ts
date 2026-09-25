import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { IconComponent } from '../icon/icon.component'

@Component({
  selector: 'app-empty-state',
  imports: [CommonModule, IconComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  title = input.required<string>()
  iconName = input.required<string>()
  description = input<string>('')
}
