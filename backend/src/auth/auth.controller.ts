import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { RequestWithUser } from '@src/common/dto/request-with-user';

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
  @Auth(Role.ADMIN, Role.USER)
  profile(@Request() req: RequestWithUser) {
    // if (req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     "You don't have permission to access this route",
    //   );
    // }

    return this.authService.profile(req.user.username, req.user.role);
  }
}
