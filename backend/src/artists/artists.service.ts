import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany({
      include: {
        _count: {
          select: {
            songs: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.artist.findUnique({
      where: { id },
      include: {
        songs: true,
      },
    });
  }
}
