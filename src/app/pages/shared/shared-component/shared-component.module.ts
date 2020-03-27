import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailUpdateComponent } from './email-update/email-update.component';
import { DropdownModule, ConfirmationService, DialogService } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';



@NgModule({
  declarations: [EmailUpdateComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    DynamicDialogModule
  ],
  exports: [EmailUpdateComponent],
  entryComponents: [EmailUpdateComponent],
  providers: [ConfirmationService, DialogService]
})
export class SharedComponentModule { }
