import { Status } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  lyrics: string;

  @IsString()
  @IsOptional()
  initialPhrase: string;

  @IsString()
  @IsOptional()
  artist: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  categories: string[];

  @IsEnum([Status.pending, Status.approved, Status.rejected])
  @IsOptional()
  status: Status;
}
