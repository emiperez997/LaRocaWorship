import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';
import { SidenavModule } from './shared/components/sidenav/sidenav.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarModule,
    MatDrawerContainer,
    MatDrawer,
    SidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'La Roca Worship';
}
