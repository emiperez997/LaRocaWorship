import { Component, EventEmitter, Output } from '@angular/core';

interface ListItem {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Output() toggleEvent = new EventEmitter<void>();

  listItems: ListItem[] = [
    {
      name: 'Inicio',
      icon: 'home',
      url: '/',
    },
    {
      name: 'Canciones',
      icon: 'library_music',
      url: '/songs',
    },
    {
      name: 'Artistas',
      icon: 'person',
      url: '/artists',
    },
    {
      name: 'Inicio de sesión',
      icon: 'login',
      url: '/auth/login',
    },
  ];
}
