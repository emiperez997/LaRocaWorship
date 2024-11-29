import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Song } from './entities/song.entity';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { FiltersSongsDto } from './dto/filters-songs.dto';
import { Status } from '@prisma/client';
import { IUserActive } from '@src/common/interfaces/user-active.interface';
import { SongResponse } from './entities/song-response.entity';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: CreateSongDto): Promise<Song> {
    const artist = {
      name: createSongDto.artist.trim(),
      slug: createSongDto.artist.trim().replace(/\s+/g, '_').toLowerCase(),
    };

    return this.prisma.song.create({
      data: {
        title: createSongDto.title,
        lyrics: createSongDto.lyrics,
        initialPhrase: createSongDto.initialPhrase,
        artist: {
          connectOrCreate: {
            where: {
              slug: artist.slug,
            },
            create: artist,
          },
        },
        categories: {
          create: createSongDto.categories.map((category) => ({
            category: {
              connect: {
                name: category.trim().toLowerCase(),
              },
            },
          })),
        },
        user: {
          connect: {
            id: createSongDto.userId,
          },
        },
      },
    });
  }

  async findAll(query: FiltersSongsDto) {
    const where: any = {};

    const filters = [
      { key: 'title', options: { contains: query.title, mode: 'insensitive' } },
      { key: 'lyrics', options: { contains: query.lyrics } },
      {
        key: 'artist',
        options: {
          name: {
            contains: query.artist,
            mode: 'insensitive',
          },
        },
      },
      {
        key: 'category',
        options: {
          some: {
            category: {
              name: { contains: query.category, mode: 'insensitive' },
            },
          },
        },
      },
      { key: 'status', options: query.status },
    ];

    filters.forEach((filter) => {
      if (query[filter.key]) {
        where[filter.key === 'category' ? 'categories' : filter.key] =
          filter.options;
      }
    });

    const songs = await this.prisma.song.findMany({
      where,
      include: {
        artist: {
          select: {
            name: true,
            slug: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const songsWithCounts = this.getSongDetailsWithCounts(
      songs as unknown as Partial<Song>[],
    );

    return songsWithCounts;
  }

  getSongDetailsWithCounts(songs: Partial<Song>[]): SongResponse[] {
    const titleMap: {
      [title: string]: {
        count: number;
        details: Partial<Song>[];
        artist: string;
      };
    } = {};

    // Recorrer la lista y agrupar las canciones por título
    songs.forEach((song) => {
      if (song.title) {
        if (!titleMap[song.title]) {
          titleMap[song.title] = { count: 0, details: [], artist: '' };
        }
        titleMap[song.title].count += 1;
        titleMap[song.title].details.push({
          id: song.id,
          initialPhrase: song.initialPhrase,
        });
        titleMap[song.title].artist = song.artist?.name!;
      }
    });

    // Crear un arreglo con los resultados, incluyendo los detalles
    return Object.entries(titleMap).map(
      ([title, { count, details, artist }]) => ({
        title,
        count,
        details,
        artist,
      }),
    );
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: {
        id,
      },
      include: {
        artist: {
          select: {
            name: true,
            slug: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!song) {
      throw new NotFoundException();
    }

    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto, user: IUserActive) {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException();
    }

    if (song.userId !== user.id) {
      throw new ForbiddenException();
    }

    if (updateSongDto.artist && song.artist.name !== updateSongDto.artist) {
      const artist = {
        name: updateSongDto.artist.trim(),
        slug: updateSongDto.artist.trim().replace(/\s+/g, '_').toLowerCase(),
      };
      await this.prisma.artist.upsert({
        where: {
          slug: artist.slug,
        },
        update: artist,
        create: artist,
      });
    }

    try {
      const updatedSong = await this.prisma.song.update({
        where: {
          id,
        },
        data: {
          title: updateSongDto.title ?? song.title,
          lyrics: updateSongDto.lyrics ?? song.lyrics,
          initialPhrase: updateSongDto.initialPhrase ?? song.initialPhrase,
          categories: {
            create: updateSongDto.categories.map((category) => ({
              category: {
                connect: {
                  name: category,
                },
              },
            })),
          },
        },
      });

      return updatedSong;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  async updateStatus(id: string, status: Status): Promise<Song> {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException();
    }

    if (song.status === status) {
      throw new BadRequestException(
        'Status cannot be changed to the same value',
      );
    }

    try {
      const updatedSong = await this.prisma.song.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

      return updatedSong;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<Song> {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException();
    }

    try {
      const deletedSong = this.prisma.song.delete({
        where: {
          id,
        },
      });

      return deletedSong;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
