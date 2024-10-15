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

  @IsEnum([Status.PENDING, Status.APPROVED, Status.REJECTED])
  @IsOptional()
  status: Status;
}
