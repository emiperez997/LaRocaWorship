import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }
}
