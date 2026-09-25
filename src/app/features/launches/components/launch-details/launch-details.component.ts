import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common'
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { ChipComponent, ChipType } from '../../../../shared/components/chips/chip/chip.component'
import { ChipsWrapperComponent } from '../../../../shared/components/chips/chips-wrapper/chips-wrapper.component'
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component'
import { LoadingSkeletonComponent } from '../../../../shared/components/loading-skeleton/loading-skeleton.component'
import { Launch } from '../../models/launch.model'
import { LaunchStore } from '../../store/launch/launch.store'
import { LaunchStoreService } from '../../store/launch/launch.store.service'

// TODO: Move to util
const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png'

@Component({
  selector: 'app-launch-details',
  imports: [
    DatePipe,
    DecimalPipe,
    ChipComponent,
    ChipsWrapperComponent,
    CardComponent,
    EmptyStateComponent,
    NgOptimizedImage,
    LoadingSkeletonComponent,
  ],
  providers: [LaunchStore, LaunchStoreService],
  templateUrl: './launch-details.component.html',
  styleUrl: './launch-details.component.scss',
})
export class LaunchDetailsComponent implements OnInit {
  id = input.required<string>()

  private launchStore = inject(LaunchStore)

  readonly launch: Signal<Launch | null> = computed(() => this.launchStore.launch())
  readonly isLoading = computed(() => this.launchStore.isLoading())
  readonly error = computed(() => this.launchStore.error())

  protected readonly chipType = ChipType
  protected readonly imagePlaceholder = IMAGE_PLACEHOLDER
  protected readonly loadingArr = Array(3)

  ngOnInit() {
    this.launchStore.loadLaunches(this.id())
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement
    element.src = IMAGE_PLACEHOLDER
  }

}
