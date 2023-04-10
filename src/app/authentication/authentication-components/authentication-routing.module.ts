import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginScreenComponent } from "@authentication/authentication-components/login-screen/login-screen.component";
import {
  RegisterScreenComponent
} from "@authentication/authentication-components/register-screen/register-screen.component";
import {
  DeviceAuthenticationComponent
} from "@authentication/authentication-components/device-authentication/device-authentication.component";
import { AuthenticatedGuard } from "@shared/guards/authenticated.guard";

const routes = [
  {
    path: '',
    component: LoginScreenComponent,
  },
  {
    path: 'register',
    component: RegisterScreenComponent,
  },
  {
    path: 'device',
    component: DeviceAuthenticationComponent,
    canActivate: [AuthenticatedGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AuthenticationRoutingModule {
}
