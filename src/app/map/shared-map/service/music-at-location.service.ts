import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MusicLocation } from "@map/shared-map/model/music-location.model";

@Injectable({
  providedIn: 'root'
})
export class MusicAtLocationService {

  baseUrl = `${environment.musicServiceUrl}/song`;

  constructor(private http: HttpClient) {
  }

  loadMapsApi() {
    return this.http.get('https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey, { responseType: 'text' });
  }

  getMusicAtLocation() {
    return this.http.get<MusicLocation[]>(`${this.baseUrl}/location`);
  }
}
