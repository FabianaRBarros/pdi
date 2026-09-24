import { Component, input } from '@angular/core'
import { MatChip } from '@angular/material/chips'

export enum ChipType {
  Base = 'base',
  Success = 'success',
  Error = 'error',
}

@Component({
  selector: 'app-chip',
  imports: [MatChip],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  type = input<ChipType>(ChipType.Base)
}
