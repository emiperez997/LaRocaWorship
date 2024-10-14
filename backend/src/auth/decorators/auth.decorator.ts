import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
}
