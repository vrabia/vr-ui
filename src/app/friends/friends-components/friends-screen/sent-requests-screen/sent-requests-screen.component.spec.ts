import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestsScreenComponent } from './sent-requests-screen.component';

describe('SentRequestsScreenComponent', () => {
  let component: SentRequestsScreenComponent;
  let fixture: ComponentFixture<SentRequestsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentRequestsScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentRequestsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
