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
import { IUserActive } from '@src/common/interfaces/user-active.interface';
import { ActiveUser } from '@src/common/decorators/active-user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Auth(Role.USER)
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.favoritesService.create(createFavoriteDto, user);
  }

  @Get()
  @Auth(Role.USER)
  findAll(@ActiveUser() user: IUserActive) {
    return this.favoritesService.findAll(user.id);
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(
    @Param() params: FindByUuidParamDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.favoritesService.findOne(params.id, user);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(
    @Param() params: FindByUuidParamDto,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.favoritesService.update(params.id, updateFavoriteDto, user);
  }

  @Delete(':id')
  @Auth(Role.USER)
  remove(@Param() params: FindByUuidParamDto, @ActiveUser() user: IUserActive) {
    return this.favoritesService.remove(params.id, user);
  }
}
