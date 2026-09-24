import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChipsWrapperComponent } from "./chips-wrapper.component";

describe("ChipsWrapperComponent", () => {
  let component: ChipsWrapperComponent;
  let fixture: ComponentFixture<ChipsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsWrapperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
