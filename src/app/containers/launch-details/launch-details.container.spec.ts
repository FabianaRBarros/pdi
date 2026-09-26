import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LaunchDetailsContainer } from './launch-details.container'

describe('LaunchDetailsContainer', () => {
  let component: LaunchDetailsContainer
  let fixture: ComponentFixture<LaunchDetailsContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailsContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(LaunchDetailsContainer)
    component = fixture.componentInstance

    fixture.componentRef.setInput('launchId', 'launch-unique-id-123')
    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
