import { Status } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

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

  @IsEnum([Status.pending, Status.approved, Status.rejected])
  @IsOptional()
  status?: Status;
}
