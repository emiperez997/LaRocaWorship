import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User does not exists');

    try {
      const favorites = await this.prisma.favorite.findMany({
        where: {
          userId: userId,
        },
        include: {
          song: {
            select: {
              id: true,
              title: true,
              initialPhrase: true,
            },
          },
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });

      return favorites;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const favorite = await this.prisma.favorite.findUnique({
        where: {
          id: id,
        },
        include: {
          song: true,
        },
      });

      return favorite;
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        id: id,
      },
    });

    if (!favorite) {
      throw new NotFoundException();
    }

    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: {
          id: id,
        },
        data: {
          trasposedSteps: updateFavoriteDto.trasposedSteps,
        },
      });

      return updatedFavorite;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        id: id,
      },
    });

    if (!favorite) {
      throw new NotFoundException();
    }

    try {
      await this.prisma.favorite.delete({
        where: {
          id: id,
        },
      });

      return favorite;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
