import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { ListenedSong } from "@feed/feed-shared/model/music.model";
import { MusicService } from "@feed/feed-shared/service/music.service";
import { GetMusicHistory } from "@feed/feed-shared/redux/music-state/music.actions";
import { UserService } from "@app/core/user.service";

export interface MusicStateModel {
  pageSize: number;
  totalPages: number;
  page: number;
  songs: ListenedSong[];
}

@State<MusicStateModel>({
  name: 'musicState',
  defaults: {
    totalPages: 0,
    pageSize: 10,
    page: 0,
    songs: []
  },
})
@Injectable()
export class MusicState {

  constructor(private musicService: MusicService, private userService: UserService) {
  }

  @Selector()
  static musicFeedSongs(state: MusicStateModel) {
    return state.songs;
  }

  @Selector()
  static musicHistoryTotalPages(state: MusicStateModel) {
    return state.totalPages;
  }


  @Action(GetMusicHistory)
  getMusicHistory({ getState, patchState }: StateContext<MusicStateModel>, { forceReset }: GetMusicHistory) {
    // if forceReset is true, we need to reset the history
    if (forceReset) {
      patchState({
        totalPages: 0,
        pageSize: 6,
        songs: []
      });
    }

    // check if we already have the history for the current page
    const state = { ...getState() };
    if (state.page > 0 && state.page >= state.totalPages) {
      return;
    }

    // if we don't have the history, get it from the server
    return this.musicService.getSongsFeed(state.page, state.pageSize).pipe(
      tap((historyPage) => {
        const userIds = [...(new Set(historyPage.songs.map((song) => song.userId)))];
        this.userService.getUserListDetails(userIds).subscribe((users) => {
          const newSongs = historyPage.songs.map((song) => {
            song.user = users.find((user) => user.id === song.userId);
            return song;
          });

          const songs = [...state.songs, ...newSongs];
          const totalPages = historyPage.totalPages;

          patchState({
            totalPages,
            page: state.page + 1,
            songs,
          });
        });
      })
    )
  }

  //ToDo fix if decided to include user history
  // @Action(UpdateSongGenre)
  // updateSongGenre({ getState, patchState }: StateContext<MusicStateModel>, { songId, genre }: UpdateSongGenre) {
  //   return this.musicService.updateSongGenre(songId, genre).pipe(
  //     tap((song) => {
  //       const history = { ...getState().musicHistory };
  //       const historyPages = history.history;
  //       for (const identifier in historyPages) {
  //         const songs = history.history[identifier];
  //         const index = songs.findIndex((song) => song.song.id === songId);
  //         if (index > -1) {
  //           history.history[identifier][index].song = song;
  //         }
  //       }
  //       return patchState({
  //         musicHistory: history
  //       });
  //     }));
  // }
}

