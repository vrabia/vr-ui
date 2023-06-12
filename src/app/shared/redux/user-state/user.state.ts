import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserInfo } from "@shared/models/user.model";
import { TokenUpdateUser, UpdateUser } from "@shared/redux/user-state/user.actions";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';

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

  @Selector()
  static username(state: UserStateModel) {
    return state.user?.username;
  }

  @Selector()
  static  userId(state: UserStateModel) {
    return state.user?.id;
  }

  @Action(UpdateUser)
  updateUser({ getState, patchState }: StateContext<UserStateModel>, action: UpdateUser) {
    let userInfo = action.userInfo;
    if (action.loggedIn === false) {
      this.cookieService.delete('AccessToken');
      userInfo = undefined;
    }

    patchState({
      isLogged: action.loggedIn,
      user: userInfo,
    });
  }

  @Action(TokenUpdateUser)
  startApplicationUpdateUser({ getState, patchState }: StateContext<UserStateModel>, action: TokenUpdateUser) {
    let token = action.token;
    if (!token) {
      token = this.cookieService.get('AccessToken');
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (!decodedToken?.sub || helper.isTokenExpired(token)) {
      patchState({
        isLogged: false,
        user: undefined,
      })
      return
    }
    const isLogged = true;
    const userInfo = {
      username: decodedToken.sub,
      id: decodedToken.userId,
      email: decodedToken.email,
      roles: decodedToken.roles
    }

    patchState({
      isLogged: isLogged,
      user: userInfo as UserInfo,
    });
  }
}
