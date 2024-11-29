import { NgModule } from '@angular/core';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { ArtistsComponent } from './artists.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistsService } from '../../core/services/artists/artists.service';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './pages/details/details.component';
import { SongsModule } from '../songs/songs.module';

@NgModule({
  declarations: [ArtistsComponent, ArtistCardComponent, DetailsComponent],
  imports: [ArtistRoutingModule, SharedModule, SongsModule],
  providers: [ArtistsService],
})
export class ArtistsModule {}
