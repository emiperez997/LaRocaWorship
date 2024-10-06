import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(6, 20)
  password: string;
}
