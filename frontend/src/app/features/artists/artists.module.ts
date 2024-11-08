import { NgModule } from '@angular/core';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { ArtistsComponent } from './artists.component';
import { CommonModule } from '@angular/common';
import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistsService } from '../../core/services/artists/artists.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ArtistsComponent, ArtistCardComponent],
  imports: [ArtistRoutingModule, SharedModule],
  providers: [ArtistsService],
})
export class ArtistsModule {}
