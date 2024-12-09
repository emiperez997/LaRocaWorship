import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/common/store';
import { ToastService } from 'angular-toastify';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<RootState>,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return this.toastService.error('Please fill in all fields');
    }

    this.isLoading = true;

    console.log(this.loginForm.value);

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          this.isLoading = false;

          if (!data) {
            console.log('No data');

            return this.toastService.error(
              'An error occurred while trying to log in. Please try again.'
            );
          }

          this.authService.setToken(data.token);

          const payload = jwtDecode(data.token);

          this.store.dispatch({
            type: '[Auth] Set Auth User',
            payload,
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.toastService.error(error.error.message);
        },
      });
  }
}
