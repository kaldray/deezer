export interface DeezerSdkTrack extends DeezerSdk.Track {
  album: DeezerSdkAlbum;
  preview?: string;
  link?: string;
  release_date?: string;
  artist: DeezerSdkArtist;
  data: DeezerSdk.Track[];
}
export interface DeezerSdkAlbum extends DeezerSdk.Album {
  cover_medium?: string;
  link: string;
  tracks: DeezerSdkTrack;
  artist: DeezerSdkArtist;
}
export interface DeezerSdkArtist extends DeezerSdk.Artist {
  picture_medium?: string;
  nb_fan: number;
  nb_album: number;
  link: string;
}
