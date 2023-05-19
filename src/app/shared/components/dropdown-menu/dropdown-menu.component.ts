import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { UserState } from "@shared/redux/user-state/user.state";
import { Router } from "@angular/router";
import { BaseComponent } from "@shared/base/base.component";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent extends BaseComponent{

  menuVisible: boolean = false;

  @Select(UserState.username)
  username$: Observable<string>;

  constructor(private router: Router, private store: Store) {
    super();
  }

  toggleVisibility($event: MouseEvent) {
    this.menuVisible = !this.menuVisible;
  }

  redirectToProfile() {
    this.menuVisible = false;
    this.router.navigate(['/profile-edit']);
  }

  signOut() {
    this.menuVisible = false;
    this.router.navigate(['/auth']);
  }

  redirectToHistory() {
    this.menuVisible = false;
    this.router.navigate(['/history']);
  }

  registerDevice() {
    this.menuVisible = false;
    this.router.navigate(['/auth/device']);
  }
}
