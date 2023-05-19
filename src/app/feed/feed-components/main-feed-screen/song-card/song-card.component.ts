import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { ListenedSong } from "@feed/feed-shared/model/music.model";

@Component({
  selector: 'app-profile-history-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent extends BaseComponent implements OnInit {

  @Input()
  listenedSong: ListenedSong;

  constructor() {
    super();
  }
  ngOnInit(): void {
  }
}
