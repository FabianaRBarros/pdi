import { NgOptimizedImage } from '@angular/common'
import { Component, computed, input, Signal } from '@angular/core'
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card'

const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png';

@Component({
  selector: "app-card",
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    NgOptimizedImage,
    MatCardImage,
  ],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  title = input.required<string>();
  subtitle = input<string>();
  imageUrl = input<string>();
  fallbackImageUrl = input<string>(IMAGE_PLACEHOLDER);
  imageAlt = input<string>();

  localImageUrl: Signal<string> = computed(() => {
    const imageUrl = this.imageUrl() ?? '';
    return imageUrl !== '' ? imageUrl : this.fallbackImageUrl();
  });

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = IMAGE_PLACEHOLDER;
  }
}
