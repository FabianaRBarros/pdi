import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common'
import { Component, computed, input, output, Signal } from '@angular/core'
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card'
import { handleImageError, IMAGE_PLACEHOLDER } from '../../utils/handle-image-error.util'

@Component({
  selector: 'app-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    NgOptimizedImage,
    MatCardImage,
    NgTemplateOutlet,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  title = input.required<string>()
  subtitle = input<string>()
  showImage = input<boolean>(false)
  imageUrl = input<string>()
  fallbackImageUrl = input<string>(IMAGE_PLACEHOLDER)
  imageAlt = input<string>()
  clickable = input<boolean>(false)

  onClickCard = output()

  localImageUrl: Signal<string> = computed(() => {
    const imageUrl = this.imageUrl() ?? ''
    return imageUrl !== '' ? imageUrl : this.fallbackImageUrl()
  })

  protected onImgError(event: Event) {
    handleImageError(event)
  }

  protected handleCardClick() {
    if (this.clickable()) {
      this.onClickCard.emit()
    }
  }
}
