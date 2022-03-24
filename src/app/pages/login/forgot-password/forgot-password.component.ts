import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';
import { emailValidator } from '../login.component';
import { DialogService } from 'primeng/api';
import { EmailUpdateComponent } from '../../shared/shared-component/email-update/email-update.component';
import { FosUser } from '../../fos_user/fos_user';
import { FosUserService } from '../../fos_user/fos_user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;

  constructor(router: Router, fb: FormBuilder,
              public fosuserSrv: FosUserService,
              public dialogService: DialogService, ) {
    this.router = router;
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
    });

    this.email = this.form.controls.email;
  }

  ngOnInit() {
  }

  openEmailChangeComponent() {
    const ref = this.dialogService.open(EmailUpdateComponent, {
      header: 'Mise à jour de l\'adresse email',
      width: '70%'
    });
    ref.onClose.subscribe((user: FosUser) => {
      if (user) {
        this.fosuserSrv.httpSrv.notificationSrv
          .showSuccess('Un mail de confirmation est envoyé au nouveau mail: ' + user.email);
      }
    });
  }

  public onSubmit(values: any): void {
    if (this.form.valid) {
      this.fosuserSrv.resetPassword(values.email)
        .subscribe((data: any) => {
          this.fosuserSrv.httpSrv.notificationSrv.showSuccess('Un mail de réinitialisation est envoyé à l\'adresse email indiquée. Le lien est valable pour 48 heures.');
        }, error => this.fosuserSrv.httpSrv.handleError(error));

    }
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}
