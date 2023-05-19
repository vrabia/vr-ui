import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { MainFeedScreenComponent } from './feed-components/main-feed-screen/main-feed-screen.component';
import { FeedRoutingModule } from "@feed/feed-routing.module";
import { SongCardComponent } from "@feed/feed-components/main-feed-screen/song-card/song-card.component";
import { musicStates } from "@feed/feed-shared/redux/music.states";
import { NgxsModule } from "@ngxs/store";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    MainFeedScreenComponent,
    SongCardComponent
  ],
  imports: [
    FeedRoutingModule,
    NgxsModule.forFeature(musicStates),
    SharedModule,
    DatePipe,
    NgForOf,
    NgIf,
    InfiniteScrollModule,
    NgClass
  ],
  providers: [],
})
export class FeedModule {
}
