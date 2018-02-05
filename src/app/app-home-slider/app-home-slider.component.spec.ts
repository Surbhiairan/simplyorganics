import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeSliderComponent } from './app-home-slider.component';

describe('AppHomeSliderComponent', () => {
  let component: AppHomeSliderComponent;
  let fixture: ComponentFixture<AppHomeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
