import { ListSong } from 'src/common/entities/listSong.entity';

export interface List {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  songs?: ListSong[];
}
