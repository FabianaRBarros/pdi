import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it } from 'vitest'

import { CardComponent } from './card.component'

@Component({
  template: `
    <app-card
      [title]="title()"
      [subtitle]="subtitle()"
      [imageUrl]="imageUrl()"
      [imageAlt]="imageAlt()">
      <div card-content
        class="projected-content">
        Projected content
      </div>
    </app-card>
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  title = signal('Test title')
  subtitle = signal('Test subtitle')
  imageUrl = signal('')
  imageAlt = signal('Test image')
}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let hostComponent: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    const card = fixture.debugElement.query(By.directive(CardComponent))

    expect(card.componentInstance).toBeInstanceOf(CardComponent)
  })

  it('should display the title', () => {
    const title = fixture.nativeElement.querySelector('mat-card-title')

    expect(title.textContent.trim()).toBe('Test title')
  })

  it('should display the subtitle when provided', () => {
    const subtitle = fixture.nativeElement.querySelector('mat-card-subtitle')

    expect(subtitle).not.toBeNull()
    expect(subtitle.textContent.trim()).toBe('Test subtitle')
  })

  it('should not display the subtitle when not provided', () => {
    hostComponent.subtitle.set('')
    fixture.detectChanges()

    const subtitle = fixture.nativeElement.querySelector('mat-card-subtitle')

    expect(subtitle).toBeNull()
  })

  it('should display the image when imageUrl is provided', () => {
    hostComponent.imageUrl.set('assets/test-image.jpg')
    fixture.detectChanges()

    const image = fixture.nativeElement.querySelector('.card-image')

    expect(image).not.toBeNull()
  })

  it('should set the image source', () => {
    hostComponent.imageUrl.set('assets/test-image.jpg')
    fixture.detectChanges()

    const image = fixture.nativeElement.querySelector(
      '.card-image',
    ) as HTMLImageElement

    expect(image).not.toBeNull()
    expect(image.src).toContain('assets/test-image.jpg')
  })

  it('should set the image alt text', () => {
    hostComponent.imageUrl.set('assets/test-image.jpg')
    hostComponent.imageAlt.set('A test image')
    fixture.detectChanges()

    const image = fixture.nativeElement.querySelector(
      '.card-image',
    ) as HTMLImageElement

    expect(image.alt).toBe('A test image')
  })

  it('should not render the image when imageUrl is not provided', () => {
    hostComponent.imageUrl.set('')
    fixture.detectChanges()

    const image = fixture.nativeElement.querySelector('.card-image')

    expect(image).toBeNull()
  })

  it('should use an empty string for localImageUrl when imageUrl is undefined', () => {
    const cardDebugElement = fixture.debugElement.query(
      By.directive(CardComponent),
    )

    const cardComponent = cardDebugElement.componentInstance as CardComponent

    expect(cardComponent.localImageUrl()).toBe('')
  })

  it('should update localImageUrl when imageUrl changes', () => {
    const cardDebugElement = fixture.debugElement.query(
      By.directive(CardComponent),
    )

    const cardComponent = cardDebugElement.componentInstance as CardComponent

    expect(cardComponent.localImageUrl()).toBe('')

    hostComponent.imageUrl.set('assets/test-image.jpg')
    fixture.detectChanges()

    expect(cardComponent.localImageUrl()).toBe('assets/test-image.jpg')
  })

  it('should render projected card content', () => {
    const projectedContent = fixture.nativeElement.querySelector(
      '.projected-content',
    )

    expect(projectedContent).not.toBeNull()
    expect(projectedContent.textContent.trim()).toBe('Projected content')
  })

  it('should render the card content even when no image is provided', () => {
    const cardContent = fixture.nativeElement.querySelector('mat-card-content')

    expect(cardContent).not.toBeNull()
  })
})
