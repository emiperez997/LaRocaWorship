import { Optional } from '@nestjs/common';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsUUID()
  songId: string;

  @IsNumber()
  trasposedSteps: number;
}
