import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';
import { ToastService } from 'angular-toastify';
import { AuthService } from '../../core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AuthService, ToastService, Location],
})
export class AuthModule {}
