import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { FiltersSongsDto } from '@src/songs/dto/filters-songs.dto';
import { SongsService } from '@src/songs/songs.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly songService: SongsService,
  ) {}

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

  async findBySlug(slug: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { slug },
      include: {
        songs: {
          select: {
            id: true,
            title: true,
            initialPhrase: true,
          },
        },
      },
    });

    if (!artist) {
      throw new NotFoundException("Artist doesn't exist");
    }

    const filter = new FiltersSongsDto();
    filter.artist = artist.name;

    const songs = await this.songService.findAll(filter);

    return {
      ...artist,
      songs,
    };
  }
}
