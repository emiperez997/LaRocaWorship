import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { FiltersSongsDto } from './dto/filters-songs.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @Auth(Role.USER, Role.ADMIN)
  create(@Body(ValidationPipe) createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(@Query() query: FiltersSongsDto) {
    return this.songsService.findAll(query);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param() params: FindByUuidParamDto) {
    return this.songsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
