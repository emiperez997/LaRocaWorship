import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@src/config/environment';
import { UsersService } from '@src/users/users.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: environment.JWT.SECRET,
      signOptions: { expiresIn: environment.JWT.DURATION },
    }),
  ],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
