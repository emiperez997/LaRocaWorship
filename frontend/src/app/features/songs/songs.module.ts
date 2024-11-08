import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsService } from '../../core/services/songs/songs.service';
import { SongsRoutingModule } from './songs-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './pages/details/details.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SongsComponent } from './songs.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SongsComponent,
    DetailsComponent,
    HighlightPipe,
    SongCardComponent,
  ],
  imports: [SongsRoutingModule, SharedModule],
  providers: [SongsService],
})
export class SongsModule {}
