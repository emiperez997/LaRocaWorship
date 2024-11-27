import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ArtistsComponent } from './artists.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
  },
  {
    path: ':name',
    component: ArtistsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
