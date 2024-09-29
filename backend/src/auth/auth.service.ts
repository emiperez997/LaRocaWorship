import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { comparePasswords, hashPassword } from '@src/utils/hash';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new NotFoundException('User does not exists');

    const isPasswordCorrect = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const payload = { id: user.id, username: user.username };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await hashPassword(registerDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: registerDto.username,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          email: registerDto.email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
