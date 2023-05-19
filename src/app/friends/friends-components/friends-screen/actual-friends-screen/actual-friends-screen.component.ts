import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Select, Store } from "@ngxs/store";
import { GetActualFriends } from "@friends/shared-friends/redux/friends/friends.actions";
import { Friendship } from "@friends/shared-friends/model/friend.model";
import { FriendsState } from "@friends/shared-friends/redux/friends/friends.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-actual-friends-screen',
  templateUrl: './actual-friends-screen.component.html',
  styleUrls: ['./actual-friends-screen.component.scss']
})
export class ActualFriendsScreenComponent extends BaseComponent implements OnInit{

  @Select(FriendsState.actualFriendsList)
  actualFriendsList$: Observable<Friendship[]>;
  friends: Friendship[] = [];

  searchValue: string = '';

  constructor(private store: Store) {
    super();
  }
  requestSearchedFriends($event: any) {
    this.searchValue = $event;
    this.store.dispatch(new GetActualFriends($event, true));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetActualFriends());

    this.subscribeToDefined(this.actualFriendsList$, (actualFriendsList) => {
      this.friends = actualFriendsList;
      console.log(this.friends)
    });
  }

  requestNextPage() {
    this.store.dispatch(new GetActualFriends(this.searchValue, false));
  }
}
