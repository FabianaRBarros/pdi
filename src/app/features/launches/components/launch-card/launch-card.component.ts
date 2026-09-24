import { DatePipe } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { MatChipsModule } from '@angular/material/chips'
import { Router } from '@angular/router'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { ChipComponent, ChipType } from '../../../../shared/components/chips/chip/chip.component'
import { ChipsWrapperComponent } from '../../../../shared/components/chips/chips-wrapper/chips-wrapper.component'
import { IconComponent } from '../../../../shared/components/icon/icon.component'
import { LaunchPartial } from '../../models/launch.model'

@Component({
  selector: 'app-launch-card',
  imports: [
    DatePipe,
    MatChipsModule,
    CardComponent,
    ChipComponent,
    ChipsWrapperComponent,
    IconComponent,
  ],
  templateUrl: './launch-card.component.html',
  styleUrl: './launch-card.component.scss',
})
export class LaunchCardComponent {
  launch = input.required<LaunchPartial>()

  private router = inject(Router)

  protected chipType = ChipType

  protected goToDetails() {
    void this.router.navigate([this.launch().flightNumber])
  }
}
