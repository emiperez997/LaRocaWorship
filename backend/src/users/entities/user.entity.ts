import { Favorite } from 'src/favorites/entities/favorite.entity';
import { List } from 'src/lists/entities/list.entity';
import { Role } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lists?: List[];
  favorites?: Favorite[];
}
