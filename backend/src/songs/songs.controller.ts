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
  Req,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { FiltersSongsDto } from './dto/filters-songs.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role, Status } from '@prisma/client';
import { RequestWithUser } from '@src/common/dto/request-with-user';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @Auth(Role.USER, Role.ADMIN)
  create(
    @Body(ValidationPipe) createSongDto: CreateSongDto,
    @Req() req: RequestWithUser,
  ) {
    createSongDto.userId = req.user.id;

    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(@Query() query: FiltersSongsDto) {
    return this.songsService.findAll(query);
  }

  @Get(':id')
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

  @Patch(':id/status')
  @Auth(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body() status: Status) {
    return this.songsService.updateStatus(id, status);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
