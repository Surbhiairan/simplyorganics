import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonProfileComponent } from './salesperson-profile.component';

describe('SalespersonProfileComponent', () => {
  let component: SalespersonProfileComponent;
  let fixture: ComponentFixture<SalespersonProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
