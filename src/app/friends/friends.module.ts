import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsScreenComponent } from '@app/friends/friends-components/friends-screen/friends-screen.component';
import { FriendsRoutingModule } from "@app/friends/friends-routing.module";
import {
  SearchPeopleScreenComponent
} from "@friends/friends-components/friends-screen/search-people-screen/search-people-screen.component";
import {
  ReceivedRequestsScreenComponent
} from "@friends/friends-components/friends-screen/received-requests-screen/received-requests-screen.component";
import {
  SentRequestsScreenComponent
} from "@friends/friends-components/friends-screen/sent-requests-screen/sent-requests-screen.component";
import {
  ActualFriendsScreenComponent
} from "@friends/friends-components/friends-screen/actual-friends-screen/actual-friends-screen.component";
import { SharedModule } from "@shared/shared.module";
import { NgxsModule } from "@ngxs/store";
import { friendsStates } from "@friends/shared-friends/redux/friends.states";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FriendCardComponent } from './shared-friends/components/friend-card/friend-card.component';

@NgModule({
  declarations: [
    FriendsScreenComponent,
    SearchPeopleScreenComponent,
    ActualFriendsScreenComponent,
    ReceivedRequestsScreenComponent,
    SentRequestsScreenComponent,
    FriendCardComponent,
  ],
  imports: [
    FriendsRoutingModule,
    CommonModule,
    SharedModule,
    NgxsModule.forFeature(friendsStates),
    InfiniteScrollModule
  ]
})
export class FriendsModule {
}
