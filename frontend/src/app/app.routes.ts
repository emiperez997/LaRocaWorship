import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'songs',
    loadChildren: () =>
      import('./features/songs/songs.module').then((m) => m.SongsModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./features/artists/artists.module').then((m) => m.ArtistsModule),
  },
];
