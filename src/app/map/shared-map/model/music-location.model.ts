import { Song } from "@shared/models/music.enum";
import { UserInfo } from "@shared/models/user.model";

export interface MusicLocation {
  userId: string;
  user?: UserInfo;
  song: Song;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  region: string;
  listenedAt: string;
}
