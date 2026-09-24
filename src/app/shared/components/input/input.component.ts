import { ChangeDetectionStrategy, Component, forwardRef, input, linkedSignal, signal } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { MatIcon } from '@angular/material/icon'
import { MatFormField, MatInput, MatLabel, MatPrefix } from '@angular/material/input'

// TODO: In the future add validators
@Component({
  selector: 'app-input',
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  inputType = input('text')
  label = input.required()
  placeholder = input('')
  disabled = input<boolean>(false)

  protected localDisabled = linkedSignal(this.disabled)
  protected localValue = signal('')

  protected onChange = (value: string) => {
  }
  protected onTouched = () => {
  }

  onInputChange(value: string) {
    this.onChange?.(value)
  }

  writeValue(value: string): void {
    this.localValue.set(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.localDisabled.set(isDisabled)
  }
}
