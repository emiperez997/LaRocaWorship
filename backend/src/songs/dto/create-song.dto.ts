import { Status } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  lyrics: string;

  @IsString()
  initialPhrase: string;

  @IsString()
  artist: string;

  @IsString({ each: true })
  @IsArray()
  categories: string[];

  @IsEnum([Status.PENDING, Status.APPROVED, Status.REJECTED])
  @IsOptional()
  status?: Status;

  @IsUUID()
  userId: string;
}
