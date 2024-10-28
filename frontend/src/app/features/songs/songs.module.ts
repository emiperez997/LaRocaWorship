import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { SongsService } from '../../core/services/songs/songs.service';
import { SongsRoutingModule } from './songs-routing.module';
import { SongCardComponent } from './song-card/song-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './pages/details/details.component';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [SongsComponent, SongCardComponent, DetailsComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    HighlightPipe,
  ],
  providers: [SongsService],
})
export class SongsModule {}
