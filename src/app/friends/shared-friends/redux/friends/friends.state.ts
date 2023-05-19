import { Friendship, FriendStatus } from "@friends/shared-friends/model/friend.model";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserService } from "@app/core/user.service";
import { FriendshipsService } from "@friends/shared-friends/services/friendships.service";
import {
  AcceptFriendRequest, CancelFriendRequest, DeclineFriendRequest,
  GetActualFriends,
  GetReceivedRequests,
  GetSearchUsers,
  GetSentRequests, RemoveFriend,
  SendFriendRequest
} from "@friends/shared-friends/redux/friends/friends.actions";
import { take, tap } from "rxjs";

export interface FriendsGroupStateModel {
  page: number;
  totalPages: number;
  pageSize: number;
  friends: Friendship[];
}

export interface FriendsStateModel {
  actualFriends: FriendsGroupStateModel;
  searchedFriends: FriendsGroupStateModel;
  receivedFriends: FriendsGroupStateModel;
  sentFriends: FriendsGroupStateModel;
}

const DEFAULT_FRIENDS_GROUP_STATE: FriendsGroupStateModel = {
  page: 0,
  totalPages: 0,
  pageSize: 10,
  friends: [],
}

@State<FriendsStateModel>({
  name: 'friendsState',
  defaults: {
    actualFriends: DEFAULT_FRIENDS_GROUP_STATE,
    searchedFriends: DEFAULT_FRIENDS_GROUP_STATE,
    receivedFriends: DEFAULT_FRIENDS_GROUP_STATE,
    sentFriends: DEFAULT_FRIENDS_GROUP_STATE,
  },
})
@Injectable()
export class FriendsState {
  constructor(private userService: UserService, private friendsService: FriendshipsService, private store: Store) {
  }

  @Selector()
  static actualFriendsList(state: FriendsStateModel) {
    return state.actualFriends.friends;
  }

  @Selector()
  static searchedFriendsList(state: FriendsStateModel) {
    return state.searchedFriends.friends;
  }

  @Selector()
  static receivedFriendsList(state: FriendsStateModel) {
    return state.receivedFriends.friends;
  }

  @Selector()
  static sentFriendsList(state: FriendsStateModel) {
    return state.sentFriends.friends;
  }


  @Action(GetActualFriends)
  getActualFriends({ getState, patchState }: StateContext<FriendsStateModel>, action: GetActualFriends) {
    if (action.forceReset) {
      patchState({
        actualFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }
    const state = { ...getState() };
    const friendsGroup = state.actualFriends;

    if (friendsGroup.page > 0 && friendsGroup.page >= friendsGroup.totalPages) {
      return;
    }
    return this.friendsService.getFriends(action.searchString, friendsGroup.page, friendsGroup.pageSize).pipe(tap((friendships) => {
      const userIds = friendships.map(friendship => friendship.friend.id);
      this.userService.getUserListUsernameAndEmail(userIds).pipe(take(1)).subscribe((users) => {
        const newFriendsGroup = friendships.map((friendship) => {
          const user = users.find(user => user.id === friendship.friend.id);
          if (user) {
            friendship.friend.username = user.username;
            friendship.friend.email = user.email;
          }
          return friendship;
        });

        patchState({
          actualFriends: {
            ...friendsGroup,
            page: friendsGroup.page + 1,
            friends: [...friendsGroup.friends, ...newFriendsGroup],
          }
        });
      });
    }));
  }

  @Action(GetReceivedRequests)
  getReceivedRequests({ getState, patchState }: StateContext<FriendsStateModel>, action: GetReceivedRequests) {
    if (action.forceReset) {
      patchState({
        receivedFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }
    const state = { ...getState() };
    const friendsGroup = state.receivedFriends;

    if (friendsGroup.page > 0 && friendsGroup.page >= friendsGroup.totalPages) {
      return;
    }
    return this.friendsService.getReceivedFriendRequests(action.searchString, friendsGroup.page, friendsGroup.pageSize).pipe(tap((friendships) => {
      const userIds = friendships.map(friendship => friendship.friend.id);
      this.userService.getUserListUsernameAndEmail(userIds).pipe(take(1)).subscribe((users) => {
        const newFriendsGroup = friendships.map((friendship) => {
          const user = users.find(user => user.id === friendship.friend.id);
          if (user) {
            friendship.friend.username = user.username;
            friendship.friend.email = user.email;
          }
          return friendship;
        });

        patchState({
          receivedFriends: {
            ...friendsGroup,
            page: friendsGroup.page + 1,
            friends: [...friendsGroup.friends, ...newFriendsGroup],
          }
        });
      });
    }));
  }

  @Action(GetSentRequests)
  getSentRequests({ getState, patchState }: StateContext<FriendsStateModel>, action: GetSentRequests) {
    if (action.forceReset) {
      patchState({
        sentFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }
    const state = { ...getState() };
    const friendsGroup = state.sentFriends;

    if (friendsGroup.page > 0 && friendsGroup.page >= friendsGroup.totalPages) {
      return;
    }
    return this.friendsService.getSentFriendRequests(action.searchString, friendsGroup.page, friendsGroup.pageSize).pipe(tap((friendships) => {
      const userIds = friendships.map(friendship => friendship.friend.id);
      this.userService.getUserListUsernameAndEmail(userIds).pipe(take(1)).subscribe((users) => {
        const newFriendsGroup = friendships.map((friendship) => {
          const user = users.find(user => user.id === friendship.friend.id);
          if (user) {
            friendship.friend.username = user.username;
            friendship.friend.email = user.email;
          }
          return friendship;
        });

        patchState({
          sentFriends: {
            ...friendsGroup,
            page: friendsGroup.page + 1,
            friends: [...friendsGroup.friends, ...newFriendsGroup],
          }
        });
      });
    }));
  }

  @Action(GetSearchUsers)
  getSearchUsers({ getState, patchState }: StateContext<FriendsStateModel>, action: GetSentRequests) {
    if (action.forceReset) {
      patchState({
        searchedFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }
    const state = { ...getState() };
    const friendsGroup = state.searchedFriends;

    if (friendsGroup.page > 0 && friendsGroup.page >= friendsGroup.totalPages) {
      return;
    }
    return this.friendsService.getUsersWithStatus(action.searchString, friendsGroup.page, friendsGroup.pageSize).pipe(tap((friendships) => {
      const userIds = friendships.map(friendship => friendship.friend.id);
      this.userService.getUserListUsernameAndEmail(userIds).pipe(take(1)).subscribe((users) => {
        const newFriendsGroup = friendships.map((friendship) => {
          const user = users.find(user => user.id === friendship.friend.id);
          if (user) {
            friendship.friend.username = user.username;
            friendship.friend.email = user.email;
          }
          return friendship;
        });

        patchState({
          searchedFriends: {
            ...friendsGroup,
            page: friendsGroup.page + 1,
            friends: [...friendsGroup.friends, ...newFriendsGroup],
          }
        });
      });
    }));
  }

  @Action(SendFriendRequest)
  sendFriendRequest({ getState, patchState }: StateContext<FriendsStateModel>, action: SendFriendRequest) {
    return this.friendsService.sendFriendRequest(action.friendId).pipe(tap((friendship) => {
      const state = { ...getState() };
      const friendsGroup = state.searchedFriends;
      const newFriendsGroup = friendsGroup.friends.map(friend => {
        if (friend.friend.id === action.friendId) {
          friend.status = FriendStatus.SENT;
        }
        return friend;
      });
      patchState({
        searchedFriends: {
          ...friendsGroup,
          friends: newFriendsGroup,
        },
        sentFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }));
  }

  @Action(AcceptFriendRequest)
  acceptFriendRequest({ getState, patchState }: StateContext<FriendsStateModel>, action: AcceptFriendRequest) {
    return this.friendsService.acceptFriendRequest(action.friendId).pipe(tap((friendship) => {
      const state = { ...getState() };
      const receivedFriendsGroup = state.receivedFriends;
      const newReceivedFriendsGroup = receivedFriendsGroup.friends.filter(friend => friend.friend.id !== action.friendId);

      const searchedFriendsGroup = state.searchedFriends;
      const newSearchedFriendsGroup = searchedFriendsGroup.friends.map(friend => {
          if (friend.friend.id === action.friendId) {
            friend.status = FriendStatus.ACCEPTED;
          }
          return friend;
      });

      patchState({
        receivedFriends: {
          ...receivedFriendsGroup,
          friends: newReceivedFriendsGroup,
        },
        searchedFriends: {
          ...searchedFriendsGroup,
          friends: newSearchedFriendsGroup,
        },
        actualFriends: DEFAULT_FRIENDS_GROUP_STATE,
      });
    }));
  }

  @Action(CancelFriendRequest)
  cancelFriendRequest({ getState, patchState }: StateContext<FriendsStateModel>, action: CancelFriendRequest) {
    return this.friendsService.rejectOrCancelFriendRequest(action.friendId).pipe(tap((friendship) => {
      const state = { ...getState() };
      const sentFriendsGroup = state.sentFriends;
      const newSentFriendsGroup = sentFriendsGroup.friends.filter(friend => friend.friend.id !== action.friendId);

      const searchedFriendsGroup = state.searchedFriends;
      const newSearchedFriendsGroup = searchedFriendsGroup.friends.map(friend => {
          if (friend.friend.id === action.friendId) {
            friend.status = FriendStatus.NONE;
          }
          return friend;
      });

      patchState({
        sentFriends: {
          ...sentFriendsGroup,
          friends: newSentFriendsGroup,
        },
        searchedFriends: {
          ...searchedFriendsGroup,
          friends: newSearchedFriendsGroup,
        }
      });
    }));
  }

  @Action(DeclineFriendRequest)
  declineFriendRequest({ getState, patchState }: StateContext<FriendsStateModel>, action: DeclineFriendRequest) {
    return this.friendsService.rejectOrCancelFriendRequest(action.friendId).pipe(tap((friendship) => {
      const state = { ...getState() };
      const receivedFriendsGroup = state.receivedFriends;
      const newReceivedFriendsGroup = receivedFriendsGroup.friends.filter(friend => friend.friend.id !== action.friendId);

      const searchedFriendsGroup = state.searchedFriends;
      const newSearchedFriendsGroup = searchedFriendsGroup.friends.map(friend => {
          if (friend.friend.id === action.friendId) {
            friend.status = FriendStatus.NONE;
          }
          return friend;
      });

      patchState({
        receivedFriends: {
          ...receivedFriendsGroup,
          friends: newReceivedFriendsGroup,
        },
        searchedFriends: {
          ...searchedFriendsGroup,
          friends: newSearchedFriendsGroup,
        }
      });
    }));
  }

  @Action(RemoveFriend)
  removeFriend({ getState, patchState }: StateContext<FriendsStateModel>, action: RemoveFriend) {
    return this.friendsService.removeFriend(action.friendId).pipe(tap((friendship) => {
      const state = { ...getState() };
      const actualFriendsGroup = state.actualFriends;
      const newActualFriendsGroup = actualFriendsGroup.friends.filter(friend => friend.friend.id !== action.friendId);

      const searchedFriendsGroup = state.searchedFriends;
      const newSearchedFriendsGroup = searchedFriendsGroup.friends.map(friend => {
          if (friend.friend.id === action.friendId) {
            friend.status = FriendStatus.NONE;
          }
          return friend;
      });

      patchState({
        actualFriends: {
          ...actualFriendsGroup,
          friends: newActualFriendsGroup,
        },
        searchedFriends: {
          ...searchedFriendsGroup,
          friends: newSearchedFriendsGroup,
        }
      });
    }));
  }

}
