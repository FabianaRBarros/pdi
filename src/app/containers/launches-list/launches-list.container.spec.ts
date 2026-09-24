import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LaunchesListContainer } from "./launches-list.container";

describe("LaunchesList", () => {
  let component: LaunchesListContainer;
  let fixture: ComponentFixture<LaunchesListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchesListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
