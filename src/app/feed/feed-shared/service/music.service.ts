import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { PagedSongs } from "@feed/feed-shared/model/music.model";
import { Song } from "@shared/models/music.enum";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  baseUrl = `${environment.musicServiceUrl}/song`;

  constructor(private http: HttpClient) {
  }

  getUserMusicHistory(page: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return this.http.get<PagedSongs>(`${this.baseUrl}/user-history`, {params});
  }

  updateSongGenre(songId: string, genre: string): Observable<Song> {
    return this.http.put<Song>(`${this.baseUrl}/genre`, {id: songId, genre});
  }

  getSongsFeed(page: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return this.http.get<PagedSongs>(`${this.baseUrl}/all-history`, {params});
  }
}
