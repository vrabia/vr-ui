export interface Friend {
  id: string;
  name: string;
  username: string;
  email: string;
  genre: string;
}

export interface Friendship {
  friend: Friend;
  status: FriendStatus;
  friendsSince: string;
}

export interface PagedFriendships {
  friendshipDTO: Friendship[];
  totalPages: number;
  currentPage: number;
}

export enum FriendStatus {
  ACCEPTED = 'ACCEPTED',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  NONE = 'NONE',
  SELF = 'SELF',
}
