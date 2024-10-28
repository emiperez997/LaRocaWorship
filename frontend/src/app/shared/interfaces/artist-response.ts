import { Artist } from '../../core/services/artists/entity/artist';

export interface ArtistResponse extends Artist {
  _count: {
    songs: number;
  };
}
