import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Anneeacad } from 'src/app/pages/anneeacad/anneeacad';
import { AnneeacadService } from 'src/app/pages/anneeacad/anneeacad.service';
import { FosUserService } from 'src/app/pages/fos_user/fos_user.service';

@Component({
  selector: 'app-email-update',
  templateUrl: './email-update.component.html',
  styleUrls: ['./email-update.component.scss'],
  providers: [DialogService]
})
export class EmailUpdateComponent implements OnInit, OnDestroy {
  anneeacads: Anneeacad[];
  subscriptions: Subscription[] = [];
  recoveryData: any = {};

  constructor(public dialogService: DialogService,
              public anneeacadSrv: AnneeacadService,
              public fosUserSrv: FosUserService,
              public ref: DynamicDialogRef
              ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.findAnneeacadEnCours();
  }

  applyEmailChange() {
    this.recoveryData.idAnnee = this.recoveryData.selectedAnnee.id;
    const subscription = this.fosUserSrv.emailChange(this.recoveryData)
      .subscribe((data: any) => {
        this.ref.close(data);
      }, error => {
        this.anneeacadSrv.httpSrv.handleError(error);
      });
    if (!this.subscriptions.includes(subscription)) {
      this.subscriptions.push(subscription);
    }

  }

  findAnneeacadEnCours() {
    const subscription = this.anneeacadSrv.findAnneeEncours()
      .subscribe((data: any) => {
        this.anneeacads = data;
      }, error => {
        this.anneeacadSrv.httpSrv.handleError(error);
      });
    if (!this.subscriptions.includes(subscription)) {
      this.subscriptions.push(subscription);
    }

  }

}
