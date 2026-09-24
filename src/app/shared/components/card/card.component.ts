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
  imageAlt = input<string>();

  localImageUrl: Signal<string> = computed(() => this.imageUrl() ??"");
}
