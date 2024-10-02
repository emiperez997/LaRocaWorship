import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../core/services/songs/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export class SongsComponent implements OnInit {
  songs: any[] = [];

  constructor(private readonly songsService: SongsService) {}

  ngOnInit(): void {
    this.songsService.getSongs().subscribe((songs) => {
      this.songs = songs;
      console.log(this.songs);
    });
  }
}
