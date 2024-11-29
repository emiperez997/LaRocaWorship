import { Song } from './song.entity';

export interface SongResponse {
  title: string;
  count: number;
  details: Partial<Song>[];
  artist: string;
}
