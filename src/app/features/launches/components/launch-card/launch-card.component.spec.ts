import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LaunchPartial } from '../../models/launch.model'

import { LaunchCardComponent } from './launch-card.component'

describe('LaunchCardComponent', () => {
  let component: LaunchCardComponent
  let fixture: ComponentFixture<LaunchCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LaunchCardComponent)
    component = fixture.componentInstance

    fixture.componentRef.setInput('launch', {
      id: 'mock-id',
      flightNumber: 1,
      missionName: 'mock mission name',
      imageUrl: 'image.png',
      imageFallbackUrl: 'image2.png',
      launchDate: new Date(),
      success: true,
    } as LaunchPartial)
    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
