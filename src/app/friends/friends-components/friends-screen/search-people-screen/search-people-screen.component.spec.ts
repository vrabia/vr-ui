import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleScreenComponent } from './search-people-screen.component';

describe('SearchPeopleScreenComponent', () => {
  let component: SearchPeopleScreenComponent;
  let fixture: ComponentFixture<SearchPeopleScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPeopleScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPeopleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
