import { Component, input } from '@angular/core'

@Component({
  selector: 'app-loading-skeleton',
  imports: [],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss',
})
export class LoadingSkeletonComponent {
  readonly width = input<string>('100%')
  readonly height = input<string>('1rem')
  readonly shape = input<'line' | 'circle' | 'rectangle'>('line')
}
