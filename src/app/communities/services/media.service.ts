import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  baseUrl = `${environment.mediaServiceUrl}/image/communities`;

  constructor(private http: HttpClient) {
  }

  getCommunityPicturesNames() {
    return this.http.get<string[]>(`${this.baseUrl}/names`);
  }
}
