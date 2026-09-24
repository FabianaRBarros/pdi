import { Component } from '@angular/core'
import { MatChipSet } from '@angular/material/chips'

@Component({
  selector: "app-chips-wrapper",
  imports: [MatChipSet],
  templateUrl: "./chips-wrapper.component.html",
  styleUrl: "./chips-wrapper.component.scss",
})
export class ChipsWrapperComponent {}
