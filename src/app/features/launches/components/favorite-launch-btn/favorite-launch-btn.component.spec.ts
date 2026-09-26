import { Component, input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { FavoriteLaunchStore } from '../../store/favorite-launch/favorite-launch.store'
import { FavoriteLaunchBtnComponent } from './favorite-launch-btn.component'

@Component({
  selector: 'app-icon',
  standalone: true,
  template: '',
})
class MockIconComponent {
  iconName = input.required<string>()
}

describe('FavoriteLaunchBtnComponent', () => {
  let component: FavoriteLaunchBtnComponent
  let fixture: ComponentFixture<FavoriteLaunchBtnComponent>

  let mockStore: {
    isFavorite: Mock;
    toggleFavorite: Mock;
  }
  let isFavoriteSignalSpy: Mock

  beforeEach(async () => {
    isFavoriteSignalSpy = vi.fn().mockReturnValue(false)

    mockStore = {
      isFavorite: vi.fn().mockReturnValue(isFavoriteSignalSpy),
      toggleFavorite: vi.fn(),
    }

    await TestBed.configureTestingModule({
      imports: [FavoriteLaunchBtnComponent, MockIconComponent],
    })
      .overrideComponent(FavoriteLaunchBtnComponent, {
        set: {
          providers: [{ provide: FavoriteLaunchStore, useValue: mockStore }],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(FavoriteLaunchBtnComponent)
    component = fixture.componentInstance
  })

  it('should create the component', () => {
    fixture.componentRef.setInput('id', 'launch-123')
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should display the border star icon when the item is NOT a favorite', () => {
    fixture.componentRef.setInput('id', 'launch-123')
    isFavoriteSignalSpy.mockReturnValue(false)
    fixture.detectChanges()

    const buttonEl = fixture.debugElement.query(By.css('.favorite-launch-btn'))
    const iconEl = fixture.debugElement.query(By.css('app-icon'))

    expect(buttonEl.classes['is-favorite']).toBeFalsy()
    expect(iconEl.componentInstance.iconName()).toBe('star_border')
  })

  it('should display the filled star icon and apply class when the item IS a favorite', () => {
    fixture.componentRef.setInput('id', 'launch-123')
    isFavoriteSignalSpy.mockReturnValue(true)
    fixture.detectChanges()

    const buttonEl = fixture.debugElement.query(By.css('.favorite-launch-btn'))
    const iconEl = fixture.debugElement.query(By.css('app-icon'))

    expect(buttonEl.classes['is-favorite']).toBe(true)
    expect(iconEl.componentInstance.iconName()).toBe('star')
  })

  it('should call toggleFavorite on the store when the button is clicked', () => {
    fixture.componentRef.setInput('id', 'launch-555')
    fixture.detectChanges()

    const buttonEl = fixture.debugElement.query(By.css('.favorite-launch-btn'))
    buttonEl.triggerEventHandler('click', null)

    expect(mockStore.toggleFavorite).toHaveBeenCalledWith('launch-555')
  })
})
