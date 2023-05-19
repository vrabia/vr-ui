import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Friendship } from "@friends/shared-friends/model/friend.model";

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {
  baseUrl = `${environment.userDetailsServiceUrl}`;

  constructor(private http: HttpClient) {
  }

  getFriends(search: string, page: number, pageSize: number): Observable<Friendship[]> {
    const params: HttpParams = this.buildQueryParams(search, page, pageSize)
    return this.http.get<Friendship[]>(`${this.baseUrl}/friends`, { params });
  }

  getSentFriendRequests(search: string, page: number, pageSize: number): Observable<Friendship[]> {
    const params: HttpParams = this.buildQueryParams(search, page, pageSize)
    return this.http.get<Friendship[]>(`${this.baseUrl}/friend-request/sent`, { params });
  }

  getReceivedFriendRequests(search: string, page: number, pageSize: number): Observable<Friendship[]> {
    const params: HttpParams = this.buildQueryParams(search, page, pageSize)
    return this.http.get<Friendship[]>(`${this.baseUrl}/friend-request/received`, { params });
  }

  getUsersWithStatus(search: string, page: number, pageSize: number): Observable<Friendship[]> {
    const params: HttpParams = this.buildQueryParams(search, page, pageSize)
    return this.http.get<Friendship[]>(`${this.baseUrl}/users`, { params });
  }

  sendFriendRequest(userId: string) {
    return this.http.post(`${this.baseUrl}/friend-request`, { friendId: userId });
  }

  acceptFriendRequest(userId: string) {
    return this.http.put(`${this.baseUrl}/friend-request`, { friendId: userId });
  }

  rejectOrCancelFriendRequest(userId: string) {
    return this.http.delete(`${this.baseUrl}/friend-request`, {body: {friendId: userId} });
  }

  removeFriend(userId: string) {
    return this.http.delete(`${this.baseUrl}/friends`, { body: {friendId: userId} });
  }


  private buildQueryParams(search: string, page: number, pageSize: number): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('search', search);
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return params;
  }
}
