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

const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png'

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

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement
    element.src = IMAGE_PLACEHOLDER
  }

  protected handleCardClick() {
    if (this.clickable()) {
      this.onClickCard.emit()
    }
  }
}
