import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../core/services/songs/songs.service';
import { SongResponse } from '../../shared/interfaces/song-response';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export class SongsComponent implements OnInit {
  songs: SongResponse[] = [];

  constructor(private readonly songsService: SongsService) {}

  ngOnInit(): void {
    this.songsService.getSongs('api').subscribe((songs) => {
      this.songs = songs;
    });
  }
}
