import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistsService } from '../../core/services/artists/artists.service';
import { ArtistCardComponent } from './artist-card/artist-card.component';

@NgModule({
  declarations: [ArtistsComponent, ArtistCardComponent],
  imports: [CommonModule, ArtistRoutingModule],
  providers: [ArtistsService],
})
export class ArtistsModule {}
