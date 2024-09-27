import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      },
    });

    if (user && user.length > 0) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    try {
      return this.prisma.user.create({
        data: {
          username: createUserDto.username,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new HttpException('Error creating user', 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    try {
      return this.prisma.user.update({
        where: { id },
        data: {
          username: updateUserDto.username ?? user.username,
          firstName: updateUserDto.firstName ?? user.firstName,
          lastName: updateUserDto.lastName ?? user.lastName,
        },
      });
    } catch (error) {
      throw new HttpException('Error updating user', 500);
    }
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Error removing user', 500);
    }
  }
}
