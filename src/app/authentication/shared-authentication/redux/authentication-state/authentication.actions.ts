import { Credentials, RegisterCredentials } from "@authentication/shared-authentication/models/authentication.model";

export class Login {
  static readonly type = '[AuthenticationState] Login';
  constructor(public credentials: Credentials) {}
}

export class Register {
  static readonly type = '[AuthenticationState] Register';
  constructor(public credentials: RegisterCredentials) {}
}
