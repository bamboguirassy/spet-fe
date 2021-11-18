import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmDialogModule, ConfirmationService, DropdownModule, DialogService, PasswordModule, ProgressSpinnerModule, InputMaskModule, SelectButtonModule, EditorModule, SpinnerModule, TabViewModule } from 'primeng/primeng';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { PreconfirmEtudiantCreationComponent } from '../etudiant/preconfirm-etudiant-creation/preconfirm-etudiant-creation.component';
import { RequestEtudiantCreationComponent } from '../etudiant/request-etudiant-creation/request-etudiant-creation.component';
import { OnePreinscriptionResolver } from '../preinscription/one-preinscription.resolver';
import { EtudiantPrimoEntrantCreationSuccessComponent } from '../etudiant/etudiant-primo-entrant-creation-success/etudiant-primo-entrant-creation-success.component';

export const routes = [
  { path: '', component: RegisterComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'preconfirm-etudiant', component: PreconfirmEtudiantCreationComponent },
  { path: 'primo-success-etudiant/:id', component: EtudiantPrimoEntrantCreationSuccessComponent },
  {
    path: 'request-creation/:id' /*id = idpreinscription*/,
    component: RequestEtudiantCreationComponent,
    resolve: { preinscription: OnePreinscriptionResolver }
  }
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
    InputMaskModule,
    SelectButtonModule,
    EditorModule,
    SpinnerModule,
    TabViewModule
  ],
  declarations: [
    RegisterComponent,
    ConfirmationComponent,
    PreconfirmEtudiantCreationComponent,
    RequestEtudiantCreationComponent,
    EtudiantPrimoEntrantCreationSuccessComponent
  ],
  providers: [ConfirmationService, DialogService]
})
export class RegisterModule { }
