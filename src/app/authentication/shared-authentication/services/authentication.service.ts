import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Credentials, RegisterCredentials } from "@authentication/shared-authentication/models/authentication.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { UserInfo } from "@shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  public register(credentials: RegisterCredentials): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${environment.vrauthServiceUrl}/auth/register`, credentials);
  }

  public login(credentials: Credentials) {
    return this.http.post(`${environment.vrauthServiceUrl}/auth/login`, credentials, { withCredentials: true });
  }
}
