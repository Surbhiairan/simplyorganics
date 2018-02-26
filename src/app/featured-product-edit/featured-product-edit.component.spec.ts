import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductEditComponent } from './featured-product-edit.component';

describe('FeaturedProductEditComponent', () => {
  let component: FeaturedProductEditComponent;
  let fixture: ComponentFixture<FeaturedProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
