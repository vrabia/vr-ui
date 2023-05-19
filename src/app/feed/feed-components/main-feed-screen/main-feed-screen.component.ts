import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { MusicState } from "@feed/feed-shared/redux/music-state/music.state";
import { Observable } from "rxjs";
import { ListenedSong } from "@feed/feed-shared/model/music.model";
import { GetMusicHistory } from "@feed/feed-shared/redux/music-state/music.actions";

@Component({
  selector: 'app-main-feed-screen',
  templateUrl: './main-feed-screen.component.html',
  styleUrls: ['./main-feed-screen.component.scss']
})
export class MainFeedScreenComponent extends BaseComponent implements OnInit {

  @Select(MusicState.musicFeedSongs)
  historyPage$: Observable<ListenedSong[]>;
  historyPageSongs: ListenedSong[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetMusicHistory( true));
    this.subscribeToDefined(this.historyPage$, (historyPage) => {
      this.historyPageSongs = historyPage;
    });
  }

  requestNextPage() {
    this.store.dispatch(new GetMusicHistory(false));
  }
}
