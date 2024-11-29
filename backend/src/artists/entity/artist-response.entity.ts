import { Song } from '@src/songs/entities/song.entity';

export class ArtistResponse {
  id: number;
  name: string;
  slug: string;
  songs: Partial<Song>[];
}
