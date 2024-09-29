import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './constants';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: authConstants.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
