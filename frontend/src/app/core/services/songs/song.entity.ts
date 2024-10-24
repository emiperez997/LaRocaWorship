import { IArtist } from '../../common/artist.entity';
import { Favorite } from '../favorite/favorite.entity';
import { List } from '../lists/list.entity';
import { User } from '../users/user.entity';

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

enum Status {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}
