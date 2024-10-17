export interface RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
    role: string;
  };
}
