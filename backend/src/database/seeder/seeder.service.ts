import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { users } from './users/data';
import { hashPassword } from '@src/utils/hash';

@Injectable()
export class SeederService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const usersDB = await this.prisma.user.findMany();

    if (usersDB) {
      return 'Users already exists';
    }

    for (const user of users) {
      const hashedPassword = await hashPassword(user.password);

      await this.prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      });
    }

    return 'Create users';
  }
}
