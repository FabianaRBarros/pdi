import { Component, provideZonelessChangeDetection, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InputComponent } from './input.component'

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <app-input [label]="'Search'"
      [formControl]="reactiveControl"/>`,
})
class ReactiveTestHostComponent {
  reactiveControl = new FormControl('')
}

@Component({
  standalone: true,
  imports: [InputComponent, FormsModule],
  template: `
    <app-input [label]="'Search'"
      [(ngModel)]="templateValue"
      [disabled]="isDisabled()"/>`,
})
class TemplateTestHostComponent {
  templateValue = ''
  isDisabled = signal(false)
}

describe('InputComponent', () => {
  describe('Isolated Unit Tests', () => {
    let component: InputComponent
    let fixture: ComponentFixture<InputComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [InputComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents()

      fixture = TestBed.createComponent(InputComponent)
      component = fixture.componentInstance

      fixture.componentRef.setInput('label', 'Search')
      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should render the correct label and default inputs', () => {
      const labelElement = fixture.debugElement.query(By.css('mat-label'))
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement

      expect(labelElement.nativeElement.textContent).toContain('Search')
      expect(inputElement.type).toBe('text')
    })

    it('should update localValue when writeValue is called', () => {
      component.writeValue('New Value')
      fixture.detectChanges()

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
      expect(inputElement.value).toBe('New Value')
    })
  })

  describe('Reactive Forms Integration', () => {
    let hostComponent: ReactiveTestHostComponent
    let fixture: ComponentFixture<ReactiveTestHostComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveTestHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents()

      fixture = TestBed.createComponent(ReactiveTestHostComponent)
      hostComponent = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should update the FormControl value when the user types', () => {
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement

      inputElement.value = 'Angular 21'
      inputElement.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      expect(hostComponent.reactiveControl.value).toBe('Angular 21')
    })

    it('should update the input view when FormControl value changes programmatically', () => {
      hostComponent.reactiveControl.setValue('Updated Programmatically')
      fixture.detectChanges()

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
      expect(inputElement.value).toBe('Updated Programmatically')
    })
  })

  describe('Template-driven Forms Integration (ngModel)', () => {
    let hostComponent: TemplateTestHostComponent
    let fixture: ComponentFixture<TemplateTestHostComponent>

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TemplateTestHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents()

      fixture = TestBed.createComponent(TemplateTestHostComponent)
      hostComponent = fixture.componentInstance

      // This first detectChanges initializes the ngModel in isolation
      fixture.detectChanges()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should update ngModel when the input value changes', () => {
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement

      inputElement.value = 'Template Text'
      inputElement.dispatchEvent(new Event('input'))

      fixture.detectChanges()

      expect(hostComponent.templateValue).toBe('Template Text')
    })

    it('should reflect the change in the view when ngModel changes', async () => {
      hostComponent.templateValue = 'Model Changed'

      await fixture.whenStable()
      fixture.detectChanges()

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
      expect(inputElement.value).toBe('Model Changed')
    })

    it('should react to disabled state changes passed via the disabled signal input', () => {
      hostComponent.isDisabled.set(true)
      fixture.detectChanges()

      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
      expect(inputElement.disabled).toBe(true)
    })
  })
})
