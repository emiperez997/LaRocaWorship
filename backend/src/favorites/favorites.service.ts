import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all favorites`;
  }

  findOne(id: string) {
    return `This action returns a #${id} favorite`;
  }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: createFavoriteDto.userId,
      },
    });

    if (!user) throw new NotFoundException('User does not exists');

    const song = await this.prisma.song.findUnique({
      where: {
        id: createFavoriteDto.songId,
      },
    });

    if (!song) throw new NotFoundException('Song does not exists');

    try {
      const favorite = await this.prisma.favorite.create({
        data: {
          userId: createFavoriteDto.userId,
          songId: createFavoriteDto.songId,
          trasposedSteps: createFavoriteDto.trasposedSteps,
        },
      });

      return favorite;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
