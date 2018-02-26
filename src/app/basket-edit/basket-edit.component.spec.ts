import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEditComponent } from './basket-edit.component';

describe('BasketEditComponent', () => {
  let component: BasketEditComponent;
  let fixture: ComponentFixture<BasketEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
