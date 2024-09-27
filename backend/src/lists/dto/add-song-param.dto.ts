import { IsUUID } from "class-validator";


export class AddSongParamDto {
  @IsUUID()
  id: string;

  @IsUUID()
  songId: string;
}
