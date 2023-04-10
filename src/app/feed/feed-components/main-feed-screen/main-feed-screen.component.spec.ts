import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFeedScreenComponent } from './main-feed-screen.component';

describe('MainFeedScreenComponent', () => {
  let component: MainFeedScreenComponent;
  let fixture: ComponentFixture<MainFeedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainFeedScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainFeedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
