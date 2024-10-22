import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { RequestWithUser } from '@src/common/dto/request-with-user';
import { ActiveUser } from '@src/common/decorators/active-user.decorator';
import { IUserActive } from '@src/common/interfaces/user-active.interface';

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
  profile(@ActiveUser() user: IUserActive) {
    // if (req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException(
    //     "You don't have permission to access this route",
    //   );
    // }

    return this.authService.profile(user);
  }
}
