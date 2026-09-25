import { Component, inject, input } from '@angular/core'
import { IconComponent } from '../../../../shared/components/icon/icon.component'
import { FavoriteLaunchStore } from '../../store/favorite-launch/favorite-launch.store'

@Component({
  selector: 'app-favorite-launch-btn',
  imports: [
    IconComponent,
  ],
  templateUrl: './favorite-launch-btn.component.html',
  styleUrl: './favorite-launch-btn.component.scss',
})
export class FavoriteLaunchBtnComponent {
  id = input.required<string>()

  private readonly favoriteLaunchesStore = inject(FavoriteLaunchStore)
  protected isFavorite = this.favoriteLaunchesStore.isFavorite()

  toggleFavoriteLaunch(): void {
    this.favoriteLaunchesStore.toggleFavorite(this.id())
  }
}
