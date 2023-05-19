import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualFriendsScreenComponent } from './actual-friends-screen.component';

describe('ActualFriendsScreenComponent', () => {
  let component: ActualFriendsScreenComponent;
  let fixture: ComponentFixture<ActualFriendsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualFriendsScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualFriendsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
