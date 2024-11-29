import { Artist } from '../../core/services/artists/entity/artist';
import { Song } from '../../core/services/songs/song.entity';

export interface ArtistResponse extends Artist {
  _count: {
    songs: number;
  };
}
