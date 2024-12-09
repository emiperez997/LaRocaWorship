import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../users/user.entity';
import { environment } from '../../../../environments/environment.development';
import { of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../common/store';

interface UserToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private store: Store<RootState>
  ) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  verifyToken() {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    try {
      const decoded: UserToken = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;

      if (decoded.exp < currentTime) {
        this.logout();
        return of(false);
      }

      return of(true);
    } catch (error) {
      this.logout();
      return of(false);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${environment.backendUrl}/auth/login`,
      {
        email,
        password,
      }
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.store.dispatch({
      type: '[Auth] Unset Auth User',
    });

    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.backendUrl}/auth/register`, user);
  }
}
