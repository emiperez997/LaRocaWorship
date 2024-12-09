import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { AngularToastifyModule } from 'angular-toastify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDrawerContainer,
    MatDrawer,
    SharedModule,
    AngularToastifyModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'La Roca Worship';
}
