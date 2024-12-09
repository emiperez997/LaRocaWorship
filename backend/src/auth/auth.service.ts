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
import { IUserActive } from '@src/common/interfaces/user-active.interface';

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

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Invalid credentials');

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

  async profile(user: IUserActive) {
    try {
      return await this.usersService.findByUsername(user.username);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
