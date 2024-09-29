import { IsString, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
