import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartDetailComponent } from './view-cart-detail.component';

describe('ViewCartDetailComponent', () => {
  let component: ViewCartDetailComponent;
  let fixture: ComponentFixture<ViewCartDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCartDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
