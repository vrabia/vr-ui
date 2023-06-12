import { MusicLocation } from "@map/shared-map/model/music-location.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { MusicAtLocationService } from "@map/shared-map/service/music-at-location.service";
import { UserService } from "@app/core/user.service";
import { GetMapsApi, GetMusicAtLocation } from "@map/shared-map/redux/music-state/music.actions";
import { catchError, forkJoin, of, tap } from "rxjs";
import { UserDetail, UserInfo } from "@shared/models/user.model";


export interface MusicAtLocationStateModel {
  songs: MusicLocation[];
  mapsApi?: any;
}

@State<MusicAtLocationStateModel>({
  name: 'musicAtLocationState',
  defaults: {
    songs: []
  },
})
@Injectable()
export class MusicAtLocationState {

  constructor(private musicService: MusicAtLocationService, private userService: UserService) {
  }

  @Selector()
  static musicLocation(state: MusicAtLocationStateModel) {
    return state.songs;
  }

  @Selector()
  static mapsApi(state: MusicAtLocationStateModel) {
    return state.mapsApi;
  }

  @Action(GetMusicAtLocation)
  getMusicHistory({ getState, patchState }: StateContext<MusicAtLocationStateModel>, { forceReset }: GetMusicAtLocation) {
    // if forceReset is true, we need to reset the history
    if (forceReset) {
      patchState({
        songs: []
      });
    }
    if (getState().songs.length > 0) {
      return;
    }

    // if we don't have the history, get it from the server
    return this.musicService.getMusicAtLocation().pipe(
      tap((songs) => {
        const userIds = [...(new Set(songs.map((song) => song.userId)))];
        // patch state with the new songs
        patchState({
          songs
        });

        forkJoin([
          this.userService.getUserListDetails(userIds).pipe(catchError(error => of(error))),
          this.userService.getUserListUsernameAndEmail(userIds).pipe(catchError(error => of(error)))
        ]).subscribe(([userDetails, userInfos]) => {
          const newSongs = songs.map((song) => {
            song.user = userDetails.find((user: UserDetail) => user.id === song.userId);
            if (!song.user) {
              song.user = {} as UserInfo;
            }
            const userInfo = userInfos.find((user: UserInfo) => user.id === song.userId);
            song.user.username = userInfo.username;
            song.user.email = userInfo.email;
            return song;
          });

          patchState({
            songs: newSongs,
          });
        });
      })
    )
  }

  @Action(GetMapsApi)
  getMapsApi({ getState, patchState }: StateContext<MusicAtLocationStateModel>) {
    if (getState().mapsApi !== undefined && getState().mapsApi !== null) {
      return;
    }

    return this.musicService.loadMapsApi().pipe(
      tap((mapsApi) => {
        patchState({
          mapsApi
        });
      })
    )
  }
}

