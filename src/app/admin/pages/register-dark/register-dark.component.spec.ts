import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDarkComponent } from './register-dark.component';

describe('RegisterDarkComponent', () => {
  let component: RegisterDarkComponent;
  let fixture: ComponentFixture<RegisterDarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
