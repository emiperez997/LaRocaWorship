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

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.listsService.findAll(userId);
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
  addSong(@Param('id') id: string, @Param('songId') songId: string) {
    return this.listsService.addSong(id, songId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(id);
  }
}
