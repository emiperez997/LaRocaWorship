import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs.component';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
