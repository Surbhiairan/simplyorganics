import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonCustomersComponent } from './salesperson-customers.component';

describe('SalespersonCustomersComponent', () => {
  let component: SalespersonCustomersComponent;
  let fixture: ComponentFixture<SalespersonCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
