import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ListsModule } from './lists/lists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module.service';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './database/seeder/seeder.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SongsModule,
    FavoritesModule,
    ListsModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    SeederModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
