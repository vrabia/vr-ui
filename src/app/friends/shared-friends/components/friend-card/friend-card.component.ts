import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from "@shared/base/base.component";
import { Friendship, FriendStatus } from "@friends/shared-friends/model/friend.model";
import { Store } from "@ngxs/store";
import {
  AcceptFriendRequest,
  CancelFriendRequest, DeclineFriendRequest,
  RemoveFriend, SendFriendRequest
} from "@friends/shared-friends/redux/friends/friends.actions";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent extends BaseComponent implements OnInit {

  @Input()
  friend: Friendship;

  FriendStatus = FriendStatus;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {

  }

  removeFriend() {
   this.store.dispatch(new RemoveFriend(this.friend.friend.id));
  }

  cancelRequest() {
    this.store.dispatch(new CancelFriendRequest(this.friend.friend.id));
  }

  acceptRequest() {
    this.store.dispatch(new AcceptFriendRequest(this.friend.friend.id));
  }

  declineRequest() {
    this.store.dispatch(new DeclineFriendRequest(this.friend.friend.id));
  }

  sendRequest() {
    this.store.dispatch(new SendFriendRequest(this.friend.friend.id));
  }
}
