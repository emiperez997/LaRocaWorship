import { IsNumber, IsUUID } from "class-validator";

export class CreateFavoriteDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  songId: string;

  @IsNumber()
  trasposedSteps: number;
}
