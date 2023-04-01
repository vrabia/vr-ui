import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Login } from "@authentication/shared-authentication/redux/authentication-state/authentication.actions";
import { AuthenticationService } from "@authentication/shared-authentication/services/authentication.service";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { UserInfo } from "@shared/models/user.model";
import { UpdateUser } from "@shared/redux/user-state/user.actions";
import { CookieService } from "ngx-cookie-service";

export interface UserStateModel {
  isLogged: boolean;
  user?: UserInfo;
}

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    isLogged: false,
  },
})
@Injectable()
export class UserState {
  constructor(private cookieService: CookieService) {
  }

  @Selector()
  static isLogged(state: UserStateModel) {
    return state.isLogged;
  }

  @Action(UpdateUser)
  updateUser({ getState, patchState }: StateContext<UserStateModel>, action: UpdateUser) {
    // ToDo -> take info from token cookie, request user info from server

    // if (action.loggedIn === false) {
    //   this.cookieService.delete('AccessToken');
    // }

    patchState({
      isLogged: action.loggedIn,
      user: action.userInfo,
    });
  }
}
