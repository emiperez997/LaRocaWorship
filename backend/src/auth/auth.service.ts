import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePasswords, hashPassword } from '@src/utils/hash';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    const isPasswordCorrect = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const payload = { id: user.id, username: user.username, role: user.role };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create(registerDto);

      return user;
    } catch (error) {
      return error;
    }
  }

  async profile(username: string, role: string) {
    try {
      return await this.usersService.findByUsername(username);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
