import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDarkComponent } from './login-dark.component';

describe('LoginDarkComponent', () => {
  let component: LoginDarkComponent;
  let fixture: ComponentFixture<LoginDarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
