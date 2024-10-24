import { User } from '../users/user.entity';

export interface List {
  id: string;
  title: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  songs?: ListSong[];
}

interface ListSong {
  id: string;
  listId: string;
  songId: string;
  createdAt: Date;
  updatedAt: Date;
}
