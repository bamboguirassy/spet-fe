import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, DialogService } from 'primeng/api';
import { FosUserService } from '../../fos_user/fos_user.service';
import { preinscriptionColumns } from '../../preinscription/preinscription.columns';
import { PreinscriptionService } from '../../preinscription/preinscription.service';

@Component({
  selector: 'app-preconfirm-etudiant-creation',
  templateUrl: './preconfirm-etudiant-creation.component.html',
  styleUrls: ['./preconfirm-etudiant-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreconfirmEtudiantCreationComponent implements AfterViewInit {

  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;
  error = null;

  constructor(router: Router, fb: FormBuilder,
    public fosUserSrv: FosUserService,
    private preinscriptionSrv: PreinscriptionService,
    public dialogService: DialogService
  ) {
    this.router = router;
    this.form = fb.group({
      cni: ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls.email;
  }

  public onSubmit(values: any): void {
    this.error = null;
    if (this.form.valid) {
      this.preinscriptionSrv.requestNewEtudiantCreation(this.form.value.cni)
        .subscribe((data: any) => {
          if(data.code=='preinscription') {
            this.router.navigate(['register/request-creation/' + data.preinscription.id]);
          } else if(data.code=='etudiant') {
            this.router.navigate(['register','primo-success-etudiant',data.etudiant.id]);
          } else {
            this.preinscriptionSrv.httpSrv.notificationSrv.showError('Réponse non catégorisée !!!');
          }
        }, err => {
          this.error = err;
          this.preinscriptionSrv.httpSrv.handleError(err)
        });
    }
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }
}
