import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from "@ngxs/store";
import { UserState } from "@shared/redux/user-state/user.state";
import { PREVIOUS_QUERY_PARAM } from "@authentication/authentication-components/login-screen/login-screen.enums";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store.selectSnapshot(UserState.isLogged)) {
      return true;
    }
    this.router.navigate(['/auth'], { queryParams: { [PREVIOUS_QUERY_PARAM]: route.url } });
    return false;
  }
}
