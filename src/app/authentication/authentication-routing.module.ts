import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginScreenComponent } from "@authentication/login-screen/login-screen.component";
import { RegisterScreenComponent } from "@authentication/register-screen/register-screen.component";

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
