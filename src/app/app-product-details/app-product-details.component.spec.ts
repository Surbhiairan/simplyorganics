import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductDetailsComponent } from './app-product-details.component';

describe('AppProductDetailsComponent', () => {
  let component: AppProductDetailsComponent;
  let fixture: ComponentFixture<AppProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
