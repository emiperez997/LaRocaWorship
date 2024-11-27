import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { AddSongParamDto } from './dto/add-song-param.dto';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

import { IUserActive } from '@src/common/interfaces/user-active.interface';
import { ActiveUser } from '@src/common/decorators/active-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Lists')
@ApiBearerAuth()
@Controller('lists')
@Auth(Role.USER)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(
    @Param() params: FindByUuidParamDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.findAll(user.id);
  }

  @Get(':id/songs')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe) createListDto: CreateListDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.create(createListDto, user);
  }

  @Post(':id/:songId')
  addSong(@Param() params: AddSongParamDto, @ActiveUser() user: IUserActive) {
    return this.listsService.addSong(params.id, params.songId, user);
  }

  @Patch(':id')
  update(
    @Param() params: FindByUuidParamDto,
    @Body(ValidationPipe) updateListDto: UpdateListDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.listsService.update(params.id, updateListDto, user);
  }

  @Delete(':id')
  remove(@Param() params: FindByUuidParamDto, @ActiveUser() user: IUserActive) {
    return this.listsService.remove(params.id, user);
  }
}
