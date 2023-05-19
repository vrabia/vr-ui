import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { FriendsState } from "@friends/shared-friends/redux/friends/friends.state";
import { Observable } from "rxjs";
import { Friendship } from "@friends/shared-friends/model/friend.model";
import {
  GetActualFriends,
  GetSearchUsers,
  GetSentRequests
} from "@friends/shared-friends/redux/friends/friends.actions";
import { BaseComponent } from "@shared/base/base.component";

@Component({
  selector: 'app-search-people-screen',
  templateUrl: './search-people-screen.component.html',
  styleUrls: ['./search-people-screen.component.scss']
})
export class SearchPeopleScreenComponent extends BaseComponent implements OnInit{

  @Select(FriendsState.searchedFriendsList)
  searchFriendsList$: Observable<Friendship[]>;
  friends: Friendship[] = [];

  searchValue: string = '';

  constructor(private store: Store) {
    super();
  }
  requestSearchedFriends($event: any) {
    this.searchValue = $event;
    this.store.dispatch(new GetSearchUsers($event, true));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetSearchUsers);

    this.subscribeToDefined(this.searchFriendsList$, (searchFriendsList) => {
      console.log(JSON.stringify(searchFriendsList))
      this.friends = searchFriendsList;
    });
  }

  requestNextPage() {
    this.store.dispatch(new GetSearchUsers(this.searchValue, false));
  }
}
