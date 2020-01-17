import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes = [
  { path: '', component: RegisterComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastModule
  ],
  declarations: [
    RegisterComponent,
    ConfirmationComponent
  ]
})
export class RegisterModule { }
