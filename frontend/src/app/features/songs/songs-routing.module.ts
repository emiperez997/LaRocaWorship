import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
