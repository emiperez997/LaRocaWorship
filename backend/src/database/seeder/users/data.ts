import { Role } from '@prisma/client';
import { User } from '@src/users/entities/user.entity';

export const users: Partial<User>[] = [
  {
    firstName: 'Emiliano',
    lastName: 'Perez',
    email: 'emi.perez@gmail.com',
    role: Role.ADMIN,
    username: 'emiperez',
    password: '12345678',
  },
  {
    firstName: 'Cintia',
    lastName: 'Kromplewski',
    email: 'cintia@gmail.com',
    role: Role.USER,
    username: 'cintiak',
    password: '12345678',
  },
];
