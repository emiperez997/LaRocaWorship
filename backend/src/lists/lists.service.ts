import { HttpException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  create(createListDto: CreateListDto) {
    try {
      return this.prisma.list.create({
        data: {
          title: createListDto.title,
          userId: createListDto.userId,
        },
      });
    } catch (error) {
      throw new HttpException(`Error creating list`, 500);
    }
  }

  async findAll(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(`User with id ${userId} not found`, 404);
    }

    const lists = await this.prisma.list.findMany({
      where: {
        userId: userId,
      },
    });

    return lists;
  }

  async findOne(id: string) {
    const list = await this.prisma.list.findUnique({
      where: {
        id: id,
      },
    });

    if (!list) {
      throw new HttpException(`List with id ${id} not found`, 404);
    }

    return list;
  }

  async addSong(listId: string, songId: string) {
    const list = await this.findOne(listId);

    if (!list) {
      throw new HttpException(`List with id ${listId} not found`, 404);
    }

    const song = await this.prisma.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      throw new HttpException(`Song with id ${songId} not found`, 404);
    }

    try {
      const updatedList = await this.prisma.listSong.update({
        where: {
          id: listId,
        },
        data: {
          song: {
            connect: {
              id: songId,
            },
          },
        },
      });

      return updatedList;
    } catch (error) {
      throw new HttpException(
        `Error adding song to list with id ${listId}`,
        500,
      );
    }
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const list = await this.findOne(id);

    if (!list) {
      throw new HttpException(`List with id ${id} not found`, 404);
    }

    try {
      await this.prisma.list.update({
        where: {
          id: id,
        },
        data: {
          title: updateListDto.title,
        },
      });
    } catch (error) {
      throw new HttpException(`Error updating list with id ${id}`, 500);
    }
  }

  async remove(id: string) {
    const list = await this.findOne(id);

    if (!list) {
      throw new HttpException(`List with id ${id} not found`, 404);
    }

    try {
      await this.prisma.list.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(`Error removing list with id ${id}`, 500);
    }
  }
}
