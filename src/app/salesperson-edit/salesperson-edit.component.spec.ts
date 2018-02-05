import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonEditComponent } from './salesperson-edit.component';

describe('SalespersonEditComponent', () => {
  let component: SalespersonEditComponent;
  let fixture: ComponentFixture<SalespersonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
