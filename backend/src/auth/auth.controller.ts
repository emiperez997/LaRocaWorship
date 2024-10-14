import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from './guards/role.guard';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('register')
  register(@Body() register: RegisterDto) {
    return this.authService.register(register);
  }

  @Get('profile')
  @Auth(Role.admin, Role.user)
  profile(@Request() req: RequestWithUser) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException(
        "You don't have permission to access this route",
      );
    }

    return this.authService.profile(req.user.username, req.user.role);
  }
}
