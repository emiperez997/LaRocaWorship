import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { users } from './users/data';
import { hashPassword } from '@src/utils/hash';

@Injectable()
export class SeederService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {}

  async truncate() {
    await this.prisma.$queryRaw`TRUNCATE TABLE "Artist" CASCADE`;
    await this.prisma.$queryRaw`TRUNCATE TABLE "Song" CASCADE`;
    await this.prisma.$queryRaw`TRUNCATE TABLE "List" CASCADE`;
    await this.prisma.$queryRaw`TRUNCATE TABLE "ListSong" CASCADE`;
    await this.prisma.$queryRaw`TRUNCATE TABLE "Favorite" CASCADE`;
  }

  async seedUsers() {
    const newUsers = users.map(async (user) => {
      const password = await hashPassword(user.password);
      return { ...user, password };
    });
  }
}
