import { Component } from '@angular/core';
import { Store } from "@ngxs/store";
import { TokenUpdateUser } from "@shared/redux/user-state/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vr-ui';

  constructor(private store: Store) {
    this.store.dispatch(new TokenUpdateUser());
  }
}
