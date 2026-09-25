import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FavoriteLaunchBtnComponent } from "./favorite-launch-btn.component";

describe("FavoriteLaunchBtnComponent", () => {
  let component: FavoriteLaunchBtnComponent;
  let fixture: ComponentFixture<FavoriteLaunchBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteLaunchBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteLaunchBtnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
