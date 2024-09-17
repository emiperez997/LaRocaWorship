import { HttpException, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll(): Promise<Song[]> {
    return this.prisma.song.findMany();
  }

  findOne(id: string): Promise<Song> {
    return this.prisma.song.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.findOne(id);

    if (!song) {
      throw new HttpException('Song not found', 404);
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
          category: updateSongDto.category ?? song.category,
          status: updateSongDto.status ?? song.status,
        },
      });

      return updatedSong;
    } catch (error) {
      throw new HttpException(`Error updating the song: ${error}`, 500);
    }
  }

  remove(id: string) {
    try {
      this.prisma.song.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(`Error deleting the song: ${error}`, 500);
    }
  }
}
