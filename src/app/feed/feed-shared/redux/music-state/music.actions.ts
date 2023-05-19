export class GetMusicHistory {
  static readonly type = '[MusicState] GetMusicHistory';
  constructor(public forceReset = true) {}
}
export class UpdateSongGenre {
  static readonly type = '[MusicState] UpdateSongGenre';
  constructor(public songId: string, public genre: string) {}
}

