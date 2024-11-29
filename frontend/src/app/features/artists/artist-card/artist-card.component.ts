import { Component, Input } from '@angular/core';
import { Artist } from '../../../core/services/artists/entity/artist';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss',
})
export class ArtistCardComponent {
  @Input() artist!: Artist;

  constructor() {}
}
