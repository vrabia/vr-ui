import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {
  AuthenticateDevice,
  Login,
  Register
} from "@authentication/shared-authentication/redux/authentication-state/authentication.actions";
import { AuthenticationService } from "@authentication/shared-authentication/services/authentication.service";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { UserState } from "@shared/redux/user-state/user.state";
import { UpdateUser } from "@shared/redux/user-state/user.actions";
import { Navigate } from "@ngxs/router-plugin";
import {
  PREVIOUS_QUERY_PARAM,
  USERNAME_QUERY_PARAM
} from "@authentication/authentication-components/login-screen/login-screen.enums";

export interface AuthenticationStateModel {
  errors: string[];
  isDeviceAuthenticating: boolean;
}

@State<AuthenticationStateModel>({
  name: 'authenticationState',
  defaults: {
    errors: [],
    isDeviceAuthenticating: false
  },
})
@Injectable()
export class AuthenticationState {

  @Selector()
  isDeviceAuthenticating(state: AuthenticationStateModel) {
    return state.isDeviceAuthenticating;
  }

  constructor(private authenticationService: AuthenticationService, private store: Store) {
  }

  @Action(Login)
  login({ getState, patchState }: StateContext<AuthenticationStateModel>, action: Login) {
    if (this.store.selectSnapshot(UserState.isLogged)) {
      console.warn("Already logged in");
      return;
    }

    return this.authenticationService.login(action.credentials).pipe(
      tap((response) => {
          this.store.dispatch(new UpdateUser(undefined, true));
          patchState({
            errors: [],
          });
        },
        catchError((error) => {
            const errors = [...getState().errors, error];
            patchState({
              errors,
            });
            return throwError(error);
          }
        )));
  }

  @Action(Register)
  register({ getState, patchState }: StateContext<AuthenticationStateModel>, action: Register) {
    return this.authenticationService.register(action.credentials).pipe(
      tap((_response) => {
          this.store.dispatch(new Navigate(['auth'], {[USERNAME_QUERY_PARAM]: _response.username, [PREVIOUS_QUERY_PARAM]: action.previousRoute}));
          patchState({
            errors: [],
          });
        },
        catchError((error) => {
            const errors = [...getState().errors, error];
            patchState({
              errors,
            });
            return throwError(error);
          }
        )));
  }

  @Action(AuthenticateDevice)
  authenticateDevice({patchState}: StateContext<AuthenticationStateModel>, action: AuthenticateDevice) {
    patchState({
      isDeviceAuthenticating: true,
    })
    return this.authenticationService.authenticateDevice(action.code).pipe(
      tap((response) => {
        patchState({
          isDeviceAuthenticating: false
        })
      },
        catchError(err => {
          patchState({
            isDeviceAuthenticating: false
          })
          return throwError(err);
        })
      )
    );
  }
}
