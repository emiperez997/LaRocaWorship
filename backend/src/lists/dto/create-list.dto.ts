import { IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @IsString()
  title: string;

  @IsString()
  @IsUUID()
  userId: string;
}
