import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAuthenticationComponent } from './device-authentication.component';

describe('DeviceAuthenticationComponent', () => {
  let component: DeviceAuthenticationComponent;
  let fixture: ComponentFixture<DeviceAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
