import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@shared/base/base.component";
import { Store } from "@ngxs/store";
import { Login } from "@authentication/shared-authentication/redux/authentication-state/authentication.actions";
import { Credentials } from "@authentication/shared-authentication/models/authentication.model";
import { ActivatedRoute } from "@angular/router";
import { USERNAME_QUERY_PARAM } from "@authentication/authentication-components/login-screen/login-screen.enums";
import { UpdateUser } from "@shared/redux/user-state/user.actions";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  usernameParam: string = '';

  constructor(private store: Store, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new UpdateUser(undefined, false));

    this.subscribeToDefined(this.route.queryParams, (params) => {
      this.usernameParam = params[USERNAME_QUERY_PARAM];
    });

    this.loginForm = this.formBuilder.group({
      //ToDo add needed validation
      username: [this.usernameParam, {validators: [Validators.required, Validators.email, Validators.pattern('@.*')]}],
      password: ['', {validators: [Validators.required]}],
    });
  }

  onSubmit() {
    //ToDO add validation

    let request: Credentials;
    if (!this.loginForm.controls["username"].errors?.hasOwnProperty("pattern")) {
      // is username
      request = {
        ...this.loginForm.getRawValue()
      }
    } else if (!this.loginForm.controls["username"].errors?.hasOwnProperty("email")) {
      // is email
      request = {
        password: this.loginForm.getRawValue().password,
        email: this.loginForm.getRawValue().username
      }
    } else {
      return;
    }

    this.store.dispatch(new Login(request));
  }

}
