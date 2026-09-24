import { Component, input } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: "app-icon",
  imports: [MatIcon],
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.scss",
})
export class IconComponent {
  iconName = input.required<string>(); // Refer to this list: https://fonts.google.com/icons?icon.set=Material+Icons
}
