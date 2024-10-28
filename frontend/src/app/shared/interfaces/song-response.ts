import { Song } from '../../core/services/songs/song.entity';

export interface SongResponse {
  title: string;
  count: number;
  details: Partial<Song>[];
  artist: string;
}
