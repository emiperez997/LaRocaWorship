import { Favorite } from 'src/favorites/entities/favorite.entity';
import { List } from 'src/lists/entities/list.entity';
import { Status } from '@prisma/client';

export interface Song {
  id: string;
  title: string;
  lyrics: string;
  initialPhrase: string;
  artist: string;
  categories: string[];
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  lists?: List[];
  favorites?: Favorite[];
}
