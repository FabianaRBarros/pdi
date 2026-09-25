import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LaunchDetailsComponent } from "./launch-details.component";

describe("LaunchDetailsComponent", () => {
  let component: LaunchDetailsComponent;
  let fixture: ComponentFixture<LaunchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
