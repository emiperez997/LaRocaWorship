import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { RootState } from '../../../core/common/store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<RootState>,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return this.toastService.error('Please fill in all fields');
    }

    console.log(this.registerForm.value);

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      console.log('Passwords do not match');

      return this.toastService.error('Passwords do not match');
    }

    this.isLoading = true;

    const user = {
      username: this.registerForm.value.username,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(user).subscribe({
      next: (data: any) => {
        console.log(data);

        if (data.status === 409) {
          this.isLoading = false;
          return this.toastService.error(
            'Nombre de Usuario o Email ya existen'
          );
        }

        this.toastService.success('Registration successful');

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastService.error('Registration failed');
      },
    });
  }
}
