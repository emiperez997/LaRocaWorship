import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { SongsService } from '../../core/services/songs/songs.service';
import { SongsRoutingModule } from './songs-routing.module';

@NgModule({
  declarations: [SongsComponent],
  imports: [CommonModule, SongsRoutingModule],
  providers: [SongsService],
})
export class SongsModule {}
