import { UserInfo } from "@shared/models/user.model";

export class UpdateUser {
  static readonly type = '[UserState] UpdateUser';
  constructor(public userInfo?: UserInfo, public loggedIn?: boolean) {}
}

