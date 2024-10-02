import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  constructor(private readonly http: HttpClient) {}

  getSongs() {
    return this.http.get<any[]>(`${environment.backendUrl}/api/songs`);
  }
}
