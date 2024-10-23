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
import { ActiveUser } from '@src/common/decorators/active-user.decorator';
import { IUserActive } from '@src/common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @Auth(Role.USER, Role.ADMIN)
  create(
    @Body(ValidationPipe) createSongDto: CreateSongDto,
    @ActiveUser() user: IUserActive,
  ) {
    createSongDto.userId = user.id;

    return this.songsService.create(createSongDto);
  }

  @Get()
  @ApiQuery({ name: 'artist', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'lyrics', required: false })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: [Status.APPROVED, Status.PENDING, Status.REJECTED],
  })
  @ApiQuery({ name: 'title', required: false })
  findAll(@Query() query: FiltersSongsDto) {
    return this.songsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() params: FindByUuidParamDto) {
    return this.songsService.findOne(params.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSongDto: UpdateSongDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.songsService.update(id, updateSongDto, user);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  updateStatus(@Param('id') id: string, @Body() status: Status) {
    return this.songsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
