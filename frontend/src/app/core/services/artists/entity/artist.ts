import { SongResponse } from '../../../../shared/interfaces/song-response';
import { Song } from '../../songs/song.entity';

export interface Artist {
  id: string;
  name: string;
  slug: string;
  _count?: {
    songs: number;
  };
  songs: SongResponse[];
  createdAt: Date;
  updatedAt: Date;
}
