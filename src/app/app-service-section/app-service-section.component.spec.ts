import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServiceSectionComponent } from './app-service-section.component';

describe('AppServiceSectionComponent', () => {
  let component: AppServiceSectionComponent;
  let fixture: ComponentFixture<AppServiceSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppServiceSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServiceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
