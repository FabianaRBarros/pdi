import { DatePipe } from '@angular/common'
import { Component, input } from '@angular/core'
import { MatChipsModule } from '@angular/material/chips'
import { CardComponent } from '../../../../shared/components/card/card.component'
import { ChipComponent, ChipType } from '../../../../shared/components/chips/chip/chip.component'
import { ChipsWrapperComponent } from '../../../../shared/components/chips/chips-wrapper/chips-wrapper.component'
import { IconComponent } from '../../../../shared/components/icon/icon.component'
import { Launch } from '../../models/launch.model'

@Component({
  selector: "app-launch-card",
  imports: [
    DatePipe,
    MatChipsModule,
    CardComponent,
    ChipComponent,
    ChipsWrapperComponent,
    IconComponent,
  ],
  templateUrl: "./launch-card.component.html",
  styleUrl: "./launch-card.component.scss",
})
export class LaunchCardComponent {
  launch = input.required<Launch>()

  protected chipType = ChipType;
}
