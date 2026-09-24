import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LaunchCardComponent } from "./launch-card.component";

describe("LaunchCardComponent", () => {
  let component: LaunchCardComponent;
  let fixture: ComponentFixture<LaunchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
