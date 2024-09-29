import {
  BadRequestException,
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

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: CreateSongDto): Promise<Song> {
    return this.prisma.song.create({
      data: {
        title: createSongDto.title,
        lyrics: createSongDto.lyrics,
        initialPhrase: createSongDto.initialPhrase,
        artist: createSongDto.artist,
        categories: createSongDto.categories,
      },
    });
  }

  findAll(query: FiltersSongsDto): Promise<Song[]> {
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

    return this.prisma.song.findMany({ where });
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where: {
        id,
      },
    });

    if (!song) {
      throw new NotFoundException();
    }

    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException();
    }

    if (song.status === updateSongDto.status) {
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
          title: updateSongDto.title ?? song.title,
          lyrics: updateSongDto.lyrics ?? song.lyrics,
          initialPhrase: updateSongDto.initialPhrase ?? song.initialPhrase,
          artist: updateSongDto.artist ?? song.artist,
          categories: updateSongDto.categories ?? song.categories,
          status: updateSongDto.status ?? song.status,
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
