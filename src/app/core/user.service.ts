import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetail, UserInfo } from "@shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUserDetailsUrl = `${environment.userDetailsServiceUrl}`;
  baseUserUrl = `${environment.vrauthServiceUrl}`;

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.baseUserDetailsUrl}/user-details/${userId}`);
  }

  getUserListDetails(userIds: string[]): Observable<UserDetail[]> {
    return this.http.post<UserDetail[]>(`${this.baseUserDetailsUrl}/user-details`, {ids: userIds});
  }

  getUserListUsernameAndEmail(userIds: string[]): Observable<UserInfo[]> {
    return this.http.post<UserInfo[]>(`${this.baseUserUrl}/users`, {ids: userIds});
  }
}
