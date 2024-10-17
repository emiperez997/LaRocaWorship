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

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  // @Get('test/listSong')
  // findListSong() {
  //   return this.listsService.findListSong();
  // }

  @Get()
  @Auth(Role.USER)
  findAll(@Param() params: FindByUuidParamDto, @Req() req: RequestWithUser) {
    return this.listsService.findAll(req.user.id);
  }

  @Get(':id/songs')
  @Auth(Role.USER)
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  @Auth(Role.USER)
  create(@Body() createListDto: CreateListDto, @Req() req: RequestWithUser) {
    createListDto.userId = req.user.id;
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
