import { Status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  lyrics: string;

  @IsString()
  initialPhrase: string;

  @IsString()
  artist: string;

  @IsString()
  category: string;

  @IsEnum([Status.pending, Status.approved, Status.rejected])
  status: Status;
}
