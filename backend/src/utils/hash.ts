import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await compare(password, hashedPassword);
}
