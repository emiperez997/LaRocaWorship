import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { SongsService } from '@src/songs/songs.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService, SongsService],
})
export class ArtistsModule {}
