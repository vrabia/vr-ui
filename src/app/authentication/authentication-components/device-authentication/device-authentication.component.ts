import { Component } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Store } from "@ngxs/store";
import {
  AuthenticateDevice
} from "@authentication/shared-authentication/redux/authentication-state/authentication.actions";

@Component({
  selector: 'app-device-authentication',
  templateUrl: './device-authentication.component.html',
  styleUrls: ['./device-authentication.component.scss']
})
export class DeviceAuthenticationComponent extends BaseComponent {

  constructor (private store: Store) {
    super();
  }

  submitCode($event: string) {
    this.store.dispatch(new AuthenticateDevice($event));
  }
}
