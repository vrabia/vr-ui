export class GetActualFriends {
  static readonly type = '[FriendsState] GetActualFriends';
  constructor(public searchString: string = '', public forceReset= false) {}
}


export class GetSentRequests {
  static readonly type = '[FriendsState] GetSentRequests';
  constructor(public searchString: string = '', public forceReset = false) {}
}

export class GetReceivedRequests {
  static readonly type = '[FriendsState] GetReceivedRequests';
  constructor(public searchString: string = '', public forceReset= false) {}
}

export class GetSearchUsers {
  static readonly type = '[FriendsState] GetSearchUsers';
  constructor(public searchString: string = '', public forceReset= false) {}
}

export class RemoveFriend {
  static readonly type = '[FriendsState] RemoveFriend';
  constructor(public friendId: string) {}
}

export class SendFriendRequest {
  static readonly type = '[FriendsState] SendFriendRequest';
  constructor(public friendId: string) {}
}

export class AcceptFriendRequest {
  static readonly type = '[FriendsState] AcceptFriendRequest';
  constructor(public friendId: string) {}
}

export class DeclineFriendRequest {
  static readonly type = '[FriendsState] DeclineFriendRequest';
  constructor(public friendId: string) {}
}

export class CancelFriendRequest {
  static readonly type = '[FriendsState] CancelFriendRequest';
  constructor(public friendId: string) {}
}

export class DeleteFriend {
  static readonly type = '[FriendsState] DeleteFriend';
  constructor(public friendId: string) {}
}
