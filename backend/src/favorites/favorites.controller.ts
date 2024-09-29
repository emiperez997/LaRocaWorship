import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FindByUuidParamDto } from '@src/common/dto/find-by-uuid-param.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByUuidParamDto) {
    return this.favoritesService.findOne(params.id);
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
