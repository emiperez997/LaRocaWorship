import { Favorite } from 'src/favorites/entities/favorite.entity';
import { List } from 'src/lists/entities/list.entity';
import { Status, User } from '@prisma/client';
import { IArtist } from '@src/common/entities/artist.entity';

export interface Song {
  id: string;
  userId: string;
  user?: Partial<User>;
  title: string;
  lyrics: string;
  initialPhrase: string;
  artist?: IArtist;
  categories?: string[];
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  lists?: List[];
  favorites?: Favorite[];
}
