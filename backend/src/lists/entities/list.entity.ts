import { ListSong } from 'src/common/entities/listSong.entity';
import { User } from 'src/users/entities/user.entity';

export interface List {
  id: string;
  title: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  songs?: ListSong[];
}
