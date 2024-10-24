export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
