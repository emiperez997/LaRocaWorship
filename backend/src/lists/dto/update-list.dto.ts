import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateListDto {
  @IsString()
  title: string;
}
