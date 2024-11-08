import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../../core/services/artists/artists.service';
import { ArtistResponse } from '../../shared/interfaces/artist-response';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss',
  standalone: false,
})
export class ArtistsComponent implements OnInit {
  artists!: ArtistResponse[];

  constructor(private readonly artistService: ArtistsService) {}

  ngOnInit(): void {
    this.artistService.getArtists('api').subscribe((artist) => {
      this.artists = artist;
      console.log(this.artists);
    });
  }
}
