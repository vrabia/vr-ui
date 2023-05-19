import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { FriendsState } from "@friends/shared-friends/redux/friends/friends.state";
import { Observable } from "rxjs";
import { Friendship } from "@friends/shared-friends/model/friend.model";
import { GetReceivedRequests } from "@friends/shared-friends/redux/friends/friends.actions";

@Component({
  selector: 'app-received-requests-screen',
  templateUrl: './received-requests-screen.component.html',
  styleUrls: ['./received-requests-screen.component.scss']
})
export class ReceivedRequestsScreenComponent extends BaseComponent implements OnInit{

  @Select(FriendsState.receivedFriendsList)
  receivedFriendsList$: Observable<Friendship[]>;
  friends: Friendship[] = [];

  searchValue: string = '';

  constructor(private store: Store) {
    super();
  }

  requestSearchedFriends($event: string) {
    this.searchValue = $event;
    this.store.dispatch(new GetReceivedRequests($event, true));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetReceivedRequests());

    this.subscribeToDefined(this.receivedFriendsList$, (receivedFriendsList) => {
      console.log(JSON.stringify(receivedFriendsList))
      this.friends = receivedFriendsList;
    });
  }

  requestNextPage() {
    this.store.dispatch(new GetReceivedRequests(this.searchValue, false));
  }
}
