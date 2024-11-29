import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../../../../core/services/artists/artists.service';
import { Artist } from '../../../../core/services/artists/entity/artist';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  artist!: Partial<Artist> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistService: ArtistsService
  ) {}

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.params['slug'];

    console.log(slug);

    this.artistService.getArtist(slug, 'api').subscribe((artist) => {
      console.log(artist);
      this.artist = artist;
    });
  }
}
