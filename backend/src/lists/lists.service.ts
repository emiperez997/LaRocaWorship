import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserActive } from '@src/common/interfaces/user-active.interface';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  // async findListSong() {
  //   const ListSong = this.prisma.listSong.findMany();

  //   return ListSong;
  // }

  async create(createListDto: CreateListDto, user: IUserActive) {
    const list = await this.prisma.list.create({
      data: {
        title: createListDto.title,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return list;
  }

  async findAll(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const lists = await this.prisma.list.findMany({
      where: {
        userId: userId,
      },
      include: {
        _count: {
          select: {
            songs: true,
          },
        },
      },
    });

    return lists;
  }

  async findOne(id: string) {
    const list = await this.prisma.list.findUnique({
      where: {
        id: id,
      },
      include: {
        songs: {
          include: {
            list: false,
            song: {
              select: {
                id: true,
                title: true,
                artist: true,
                initialPhrase: true,
              },
            },
          },
        },
      },
    });

    if (!list) {
      throw new NotFoundException('List does not exists');
    }

    return list;
  }

  async addSong(listId: string, songId: string, user: IUserActive) {
    const list = await this.findOne(listId);

    if (!list) {
      throw new NotFoundException('List does not exists');
    }

    if (list.userId !== user.id) {
      throw new ForbiddenException();
    }

    const song = await this.prisma.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      throw new NotFoundException('Song doest not exists');
    }

    const updatedList = await this.prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        songs: {
          create: {
            songId: song.id,
          },
        },
      },
    });

    return updatedList;
  }

  async update(id: string, updateListDto: UpdateListDto, user: IUserActive) {
    const list = await this.findOne(id);

    if (!list) {
      throw new NotFoundException('List does not exists');
    }

    if (list.userId !== user.id) {
      throw new ForbiddenException();
    }

    try {
      const updatedList = await this.prisma.list.update({
        where: {
          id: id,
        },
        data: {
          title: updateListDto.title,
        },
      });

      return updatedList;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string, user: IUserActive) {
    const list = await this.findOne(id);

    if (!list) {
      throw new NotFoundException('List does not exists');
    }

    if (list.userId !== user.id) {
      throw new ForbiddenException();
    }

    try {
      const deletedList = await this.prisma.list.delete({
        where: {
          id: id,
        },
      });

      return deletedList;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
