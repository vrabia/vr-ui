import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesScreenComponent } from './communities-screen.component';

describe('CommunitiesScreenComponent', () => {
  let component: CommunitiesScreenComponent;
  let fixture: ComponentFixture<CommunitiesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitiesScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitiesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
