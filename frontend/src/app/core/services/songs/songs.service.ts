import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Song } from './song.entity';
import { Observable, of } from 'rxjs';
import { SongResponse } from '../../../shared/interfaces/song-response';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  constructor(private readonly http: HttpClient) {}

  songs: Partial<Song>[] = [
    {
      id: 'd634f3d3-2f73-417f-998f-cc5b898c002b',
      title: 'Cantando Santo',
      lyrics:
        '[A] [E] [F#m] [D] \nYo quiero estar, adorandote Señor \n [A] [E] [D] \nPostrado hoy ante tu altar \n [A] [E] \nCantando Santo, Santo \n [F#m] [D] \nSanto es el Señor \n [A] [E] [D] \nPoderoso, para siempre reinará',
      initialPhrase: 'Yo quiero estar, adorandote Señor',
      artist: {
        name: 'Job Gonzalez',
        slug: 'job-gonzalez',
      },
      categories: ['adoración'],
    },
    {
      id: 'd634f3d3-2f73-417f-21d3-cc5b898c002b',
      title: 'Cantando Santo',
      lyrics:
        '[A] [E] [F#m] [D] \nYo quiero estar, adorandote Señor \n [A] [E] [D] \nPostrado hoy ante tu altar \n [A] [E] \nCantando Santo, Santo \n [F#m] [D] \nSanto es el Señor \n [A] [E] [D] \nPoderoso, para siempre reinará',
      initialPhrase: 'Yo quiero estar, adorandote Señor',
      artist: {
        name: 'Job Gonzalez',
        slug: 'job-gonzalez',
      },
      categories: ['adoración'],
    },
    {
      id: 'f6cfd40a-094b-4885-bb41-3524f1016cac',
      title: 'Tu nombre es como miel',
      lyrics:
        '[F] [C] [A#] \n // Jesús // \n[F]    [C]   [A#] \nSanto y Ungido \n[F] [C] [A#] \nJesús \n\n[F]        [C]    [A#] \nLevantado y exaltado \n[F] [C] [A#] \nJesús \n\n                    [A#] \nTu Nombre es como miel \n            [F] \nEn mis labios \n                   [A#] \nTu Espíritu como agua \n          [F] \nPara mi ser \n            [A#] \nTu Palabra es \n        [C]     [Dm] \n Lampara a mis pies \n            [A#] \n Cristo Te amo \n [Gm]    [C] \n Te amo \n',
      initialPhrase: 'Jesús, Santo y Ungido...',
      artist: {
        name: 'La Roca',
        slug: 'la-roca',
      },
      categories: ['adoración'],
    },
  ];

  getSongs(type: 'mock' | 'api'): Observable<SongResponse[]> {
    if (type === 'mock') {
      return of(this.getSongDetailsWithCounts(this.songs));
    } else {
      return this.http.get<SongResponse[]>(`${environment.backendUrl}/songs`);
    }
  }

  getSong(
    id: string,
    type: 'mock' | 'api'
  ): Observable<Partial<Song> | undefined> {
    if (type === 'mock') {
      return of(this.songs.find((song) => song.id === id));
    } else {
      return this.http.get<Partial<Song>>(
        `${environment.backendUrl}/songs/${id}`
      );
    }
  }

  getSongDetailsWithCounts(songs: Partial<Song>[]): SongResponse[] {
    const titleMap: {
      [title: string]: {
        count: number;
        details: Partial<Song>[];
        artist: string;
      };
    } = {};

    // Recorrer la lista y agrupar las canciones por título
    songs.forEach((song) => {
      if (song.title) {
        if (!titleMap[song.title]) {
          titleMap[song.title] = { count: 0, details: [], artist: '' };
        }
        titleMap[song.title].count += 1;
        titleMap[song.title].details.push({
          id: song.id,
          initialPhrase: song.initialPhrase,
        });
        titleMap[song.title].artist = song.artist?.name!;
      }
    });

    // Crear un arreglo con los resultados, incluyendo los detalles
    return Object.entries(titleMap).map(
      ([title, { count, details, artist }]) => ({
        title,
        count,
        details,
        artist,
      })
    );
  }
}
