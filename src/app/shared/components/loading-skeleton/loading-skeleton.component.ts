import { Component, input } from '@angular/core'

@Component({
  selector: 'app-loading-skeleton',
  imports: [],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss',
})
export class LoadingSkeletonComponent {
  width = input<string>('100%')
  height = input<string>('1rem')
  shape = input<'line' | 'circle' | 'rectangle'>('line')
}
