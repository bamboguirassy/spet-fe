import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { PasswordModule, ProgressSpinnerModule } from 'primeng/primeng';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordConfirmationComponent } from './update-password-confirmation/update-password-confirmation.component';

export const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: UpdatePasswordConfirmationComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    PasswordModule,
    SharedComponentModule,
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, UpdatePasswordConfirmationComponent]
})

export class LoginModule { }
