import { IsNumber } from 'class-validator';

export class UpdateFavoriteDto {
  @IsNumber()
  trasposedSteps: number;
}
