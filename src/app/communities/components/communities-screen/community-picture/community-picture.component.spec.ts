import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPictureComponent } from './community-picture.component';

describe('CommunityPictureComponent', () => {
  let component: CommunityPictureComponent;
  let fixture: ComponentFixture<CommunityPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
