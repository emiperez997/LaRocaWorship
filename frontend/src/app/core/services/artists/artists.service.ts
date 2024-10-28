import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { ArtistResponse } from '../../../shared/interfaces/artist-response';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private readonly http: HttpClient) {}

  artists: ArtistResponse[] = [
    {
      id: 'c8b87adc-2a3f-40c8-a69e-f88baaad0583',
      name: 'Job Gonzalez',
      slug: 'job-gonzalez',
      createdAt: new Date('2024-10-23T23:12:53.243Z'),
      updatedAt: new Date('2024-10-23T23:12:53.243Z'),
      _count: {
        songs: 1,
      },
    },
    {
      id: '20004a99-b795-4542-95c3-d56db8940812',
      name: 'La Roca',
      slug: 'la-roca',
      createdAt: new Date('2024-10-23T23:12:53.269Z'),
      updatedAt: new Date('2024-10-23T23:12:53.269Z'),
      _count: {
        songs: 1,
      },
    },
  ];

  getArtists(type: string): Observable<ArtistResponse[]> {
    if (type === 'mock') {
      return of(this.artists);
    } else {
      return this.http.get<ArtistResponse[]>(
        `${environment.backendUrl}/artists`
      );
    }
  }
}
