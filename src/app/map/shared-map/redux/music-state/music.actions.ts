export class GetMusicAtLocation {
  static readonly type = '[MusicAtLocationState] GetMusicAtLocation';
  constructor(public forceReset = true) {}
}

export class GetMapsApi {
  static readonly type = '[MusicAtLocationState] GetMapsApi';
}
