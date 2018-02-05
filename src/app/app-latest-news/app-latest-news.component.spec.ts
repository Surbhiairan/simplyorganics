import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLatestNewsComponent } from './app-latest-news.component';

describe('AppLatestNewsComponent', () => {
  let component: AppLatestNewsComponent;
  let fixture: ComponentFixture<AppLatestNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLatestNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLatestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
