import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShopComponent } from './app-shop.component';

describe('AppShopComponent', () => {
  let component: AppShopComponent;
  let fixture: ComponentFixture<AppShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
