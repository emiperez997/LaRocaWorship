import { Status } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FiltersSongsDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  lyrics: string;

  @IsString()
  @IsOptional()
  artist: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsEnum([Status.pending, Status.approved, Status.rejected])
  @IsOptional()
  status: Status;
}
