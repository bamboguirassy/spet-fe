import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/primeng';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    PasswordModule,
    SharedComponentModule
  ],
  declarations: [LoginComponent]
})

export class LoginModule { }
