import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import { RequestWithUser } from '@src/common/dto/request-with-user';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Auth(Role.USER)
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Req() req: RequestWithUser,
  ) {
    createFavoriteDto.userId = req.user.id;

    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll(@Param() params: FindByUuidParamDto) {
    return this.favoritesService.findAll(params.userId);
  }

  @Patch(':id')
  update(
    @Param() params: FindByUuidParamDto,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(params.id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param() params: FindByUuidParamDto) {
    return this.favoritesService.remove(params.id);
  }
}
