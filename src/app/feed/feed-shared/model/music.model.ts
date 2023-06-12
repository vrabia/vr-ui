import { UserDetail } from "@shared/models/user.model";
import { Song } from "@shared/models/music.enum";

export interface ListenedSong {
  song: Song;
  lastListenDate: Date;
  timesListened: number;
  userId: string;
  user?: UserDetail;
}

export interface PagedSongs {
  songs: ListenedSong[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}
