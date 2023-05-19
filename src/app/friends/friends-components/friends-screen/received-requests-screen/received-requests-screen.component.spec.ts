import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedRequestsScreenComponent } from './received-requests-screen.component';

describe('ReceivedRequestsScreenComponent', () => {
  let component: ReceivedRequestsScreenComponent;
  let fixture: ComponentFixture<ReceivedRequestsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedRequestsScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedRequestsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
