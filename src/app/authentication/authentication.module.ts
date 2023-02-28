import { NgModule } from "@angular/core";
import { LoginScreenComponent } from "@authentication/login-screen/login-screen.component";
import { RegisterScreenComponent } from "@authentication/register-screen/register-screen.component";
import { AuthenticationRoutingModule } from "@authentication/authentication-routing.module";

@NgModule({
  declarations: [
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [
    AuthenticationRoutingModule
  ],
  providers: [],
})
export class AuthenticationModule {
}
