import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SongResponse } from '../../../shared/interfaces/song-response';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../../../core/services/songs/song.entity';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
  standalone: false,
})
export class SongCardComponent implements OnInit {
  @Input() song!: SongResponse;

  constructor() {}

  ngOnInit(): void {
    console.log(this.song);
  }
}
