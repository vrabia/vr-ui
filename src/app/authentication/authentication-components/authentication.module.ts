import { NgModule } from "@angular/core";
import { LoginScreenComponent } from "@authentication/authentication-components/login-screen/login-screen.component";
import { RegisterScreenComponent } from "@authentication/authentication-components/register-screen/register-screen.component";
import { AuthenticationRoutingModule } from "@authentication/authentication-components/authentication-routing.module";
import { NgxsModule } from "@ngxs/store";
import { authenticationStates } from "@authentication/shared-authentication/redux/authentication-states";
import { ReactiveFormsModule } from "@angular/forms";
import { JsonPipe, NgIf } from "@angular/common";
import { AppModule } from "@app/app.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    NgxsModule.forFeature(authenticationStates),
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    SharedModule
  ],
  providers: [],
})
export class AuthenticationModule {
}
