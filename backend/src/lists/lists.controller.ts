import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseFilters,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { AddSongParamDto } from './dto/add-song-param.dto';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import { RequestWithUser } from '@src/common/dto/request-with-user';
import { PrismaClientExceptionFilter } from '@src/common/filters/ExceptionFilter';
import { IUserActive } from '@src/common/interfaces/user-active.interface';
import { ActiveUser } from '@src/common/decorators/active-user.decorator';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  // @Get('test/listSong')
  // findListSong() {
  //   return this.listsService.findListSong();
  // }

  @Get()
  @Auth(Role.USER)
  findAll(
    @Param() params: FindByUuidParamDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.findAll(user.id);
  }

  @Get(':id/songs')
  @Auth(Role.USER)
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  @Auth(Role.USER)
  create(
    @Body() createListDto: CreateListDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.create(createListDto, user);
  }

  @Post(':id/:songId')
  @Auth(Role.USER)
  addSong(@Param() params: AddSongParamDto, @ActiveUser() user: IUserActive) {
    return this.listsService.addSong(params.id, params.songId, user);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @Param() params: FindByUuidParamDto,
    @Body() updateListDto: UpdateListDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.update(params.id, updateListDto, user);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(@Param() params: FindByUuidParamDto, @ActiveUser() user: IUserActive) {
    return this.listsService.remove(params.id, user);
  }
}
