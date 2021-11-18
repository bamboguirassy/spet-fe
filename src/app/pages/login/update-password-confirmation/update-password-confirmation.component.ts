import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FosUser } from '../../fos_user/fos_user';
import { FosUserService } from '../../fos_user/fos_user.service';
import { matchingPasswords } from '../../register/register.component';

@Component({
  selector: 'app-update-password-confirmation',
  templateUrl: './update-password-confirmation.component.html',
  styleUrls: ['./update-password-confirmation.component.scss']
})
export class UpdatePasswordConfirmationComponent implements AfterViewInit {

  public router: Router;
  public form: FormGroup;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;
  public user: FosUser;
  verified = false;

  constructor(router: Router, fb: FormBuilder,
              public fosUserSrv: FosUserService,
              public activatedRoute: ActivatedRoute
  ) {
    this.router = router;
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });

    this.password = this.form.controls.password;
    this.confirmPassword = this.form.controls.confirmPassword;
  }

  checkToken() {
    this.fosUserSrv.checkToken(this.activatedRoute.snapshot.params.token)
      .subscribe((data: any) => {
        this.user = data;
        this.verified = true;
      },
        error => this.fosUserSrv.httpSrv.handleError(error));
  }

  public onSubmit(values: any): void {
    if (this.form.valid) {
      values.email = this.user.email;
      this.fosUserSrv.updatePassword(values)
        .subscribe(() => {
          this.router.navigate(['login']);
        }, error => {
          this.fosUserSrv.httpSrv.handleError(error);
        });
    }
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
    this.checkToken();
  }

}
