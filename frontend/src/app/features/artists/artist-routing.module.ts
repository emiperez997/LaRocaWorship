import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ArtistsComponent } from './artists.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
  },
  {
    path: ':slug',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}
