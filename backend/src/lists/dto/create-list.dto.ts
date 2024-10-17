import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @IsString()
  title: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
