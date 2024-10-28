import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../../../../core/services/songs/songs.service';
import { Song } from '../../../../core/services/songs/song.entity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  song!: Partial<Song> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly songService: SongsService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.songService.getSong(id, 'api').subscribe((song) => {
      console.log(song);
      this.song = song;
    });
  }
}
