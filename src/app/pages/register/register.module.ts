import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmDialogModule, ConfirmationService, DropdownModule, DialogService, PasswordModule, ProgressSpinnerModule, InputMaskModule } from 'primeng/primeng';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { PreconfirmEtudiantCreationComponent } from '../etudiant/preconfirm-etudiant-creation/preconfirm-etudiant-creation.component';
import { RequestEtudiantCreationComponent } from '../etudiant/request-etudiant-creation/request-etudiant-creation.component';

export const routes = [
  { path: '', component: RegisterComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'preconfirm-etudiant', component: PreconfirmEtudiantCreationComponent },
  { path: 'request-creation/:id' /*id = idpreinscription*/, component: RequestEtudiantCreationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    DropdownModule,
    PasswordModule,
    SharedComponentModule,
    ProgressSpinnerModule,
    InputMaskModule
  ],
  declarations: [
    RegisterComponent,
    ConfirmationComponent,
    PreconfirmEtudiantCreationComponent,
    RequestEtudiantCreationComponent
  ],
  providers: [ConfirmationService, DialogService]
})
export class RegisterModule { }
