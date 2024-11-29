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
  originalLyrics!: string | undefined;

  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly songService: SongsService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.songService.getSong(id, 'api').subscribe((song) => {
      console.log(song);
      this.song = song;
      this.originalLyrics = song?.lyrics;
    });
  }

  transposeUp(step: number) {
    const songTrasposed = this.song?.lyrics?.replace(
      /([A-G])(#?)/g,
      (match, note, sharp) => {
        const index = this.notes.indexOf(note + (sharp || ''));
        const newIndex = (index + step + this.notes.length) % this.notes.length;

        return this.notes[newIndex];
      }
    );

    this.song = { ...this.song, lyrics: songTrasposed };
  }

  transposeDown(step: number) {
    const songTrasposed = this.song?.lyrics?.replace(
      /([A-G])(#?)/g,
      (match, note, sharp) => {
        const index = this.notes.indexOf(note + (sharp || ''));
        const newIndex = (index - step + this.notes.length) % this.notes.length;

        return this.notes[newIndex];
      }
    );

    this.song = { ...this.song, lyrics: songTrasposed };
  }

  resetTranspose() {
    this.song = { ...this.song, lyrics: this.originalLyrics };
  }

  copyLyrics() {
    const el = document.createElement('textarea');
    el.value = this.song?.lyrics || '';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
