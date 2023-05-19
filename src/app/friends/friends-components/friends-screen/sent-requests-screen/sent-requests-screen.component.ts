import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { FriendsState } from "@friends/shared-friends/redux/friends/friends.state";
import { Observable } from "rxjs";
import { Friendship } from "@friends/shared-friends/model/friend.model";
import { GetActualFriends, GetSentRequests } from "@friends/shared-friends/redux/friends/friends.actions";

@Component({
  selector: 'app-sent-requests-screen',
  templateUrl: './sent-requests-screen.component.html',
  styleUrls: ['./sent-requests-screen.component.scss']
})
export class SentRequestsScreenComponent extends BaseComponent implements OnInit{


  @Select(FriendsState.sentFriendsList)
  sentFriendsList$: Observable<Friendship[]>;
  friends: Friendship[] = [];

  searchValue: string = '';

  constructor(private store: Store) {
    super();
  }
  requestSearchedFriends($event: string) {
    this.searchValue = $event;
    this.store.dispatch(new GetSentRequests($event, true));
  }

  requestNextPage() {
    this.store.dispatch(new GetSentRequests(this.searchValue, false));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetSentRequests());

    this.subscribeToDefined(this.sentFriendsList$, (sentFriendsList) => {
      console.log(JSON.stringify(sentFriendsList))
      this.friends = sentFriendsList;
    });
  }
}
