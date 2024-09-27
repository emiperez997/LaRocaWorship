import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { AddSongParamDto } from './dto/add-song-param.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  // @Get('test/listSong')
  // findListSong() {
  //   return this.listsService.findListSong();
  // }

  @Get(':userId')
  findAll(@Param() params: FindByUuidParamDto) {
    return this.listsService.findAll(params.userId);
  }

  @Get(':id/songs')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Post(':id/:songId')
  addSong(@Param() params: AddSongParamDto) {
    return this.listsService.addSong(params.id, params.songId);
  }

  @Patch(':id')
  update(
    @Param() params: FindByUuidParamDto,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.listsService.update(params.id, updateListDto);
  }

  @Delete(':id')
  remove(@Param() params: FindByUuidParamDto) {
    return this.listsService.remove(params.id);
  }
}
