import { IsOptional, IsUUID } from 'class-validator';

export class FindByUuidParamDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsUUID()
  @IsOptional()
  userId: string;
}
