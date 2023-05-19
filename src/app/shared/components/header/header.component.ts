import { Component, OnInit } from '@angular/core';
import { async, Observable } from "rxjs";
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { UserState } from "@shared/redux/user-state/user.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  @Select(UserState.isLogged)
  isUserLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
  }
}
