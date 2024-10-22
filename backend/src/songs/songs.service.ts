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

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: CreateSongDto): Promise<Song> {
    return this.prisma.song.create({
      data: {
        title: createSongDto.title,
        lyrics: createSongDto.lyrics,
        initialPhrase: createSongDto.initialPhrase,
        artist: {
          connectOrCreate: {
            where: {
              name: createSongDto.artist,
            },
            create: {
              name: createSongDto.artist,
            },
          },
        },
        categories: {
          create: createSongDto.categories.map((category) => ({
            category: {
              connect: {
                name: category,
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

    if (query.title) {
      where.title = {
        contains: query.title,
      };
    }

    if (query.lyrics) {
      where.lyrics = {
        contains: query.lyrics,
      };
    }

    if (query.artist) {
      where.artist = {
        contains: query.artist,
      };
    }

    if (query.category) {
      where.categories = {
        has: query.category,
      };
    }

    if (query.status) {
      where.status = query.status;
    }

    // return this.prisma.song.findMany({ where });

    const songs = await this.prisma.song.groupBy({
      by: ['title'],
      _count: {
        title: true,
      },
      where,
    });

    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: {
        id,
      },
      include: {
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

    try {
      const updatedSong = await this.prisma.song.update({
        where: {
          id,
        },
        data: {
          title: updateSongDto.title ?? song.title,
          lyrics: updateSongDto.lyrics ?? song.lyrics,
          initialPhrase: updateSongDto.initialPhrase ?? song.initialPhrase,
          artist: {
            connectOrCreate: {
              where: {
                name: updateSongDto.artist ?? song.artist.name,
              },
              create: {
                name: updateSongDto.artist ?? song.artist.name,
              },
            },
          },
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
