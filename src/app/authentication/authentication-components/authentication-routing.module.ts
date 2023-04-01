import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginScreenComponent } from "@authentication/authentication-components/login-screen/login-screen.component";
import { RegisterScreenComponent } from "@authentication/authentication-components/register-screen/register-screen.component";

const routes = [
  {
    path: '',
    component: LoginScreenComponent,
  },
  {
    path: 'register',
    component: RegisterScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
