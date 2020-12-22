import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';

@Component({
  selector: 'app-code-validator',
  templateUrl: './code-validator.component.html',
  styleUrls: ['./code-validator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CodeValidatorComponent implements OnInit {
  public form: FormGroup;
  public code: AbstractControl;
  codeSent = false;

  secureCode: number;

  constructor(public router: Router, public fb: FormBuilder,
              public authSrv: AuthService, private tokenManager: TokenManagerService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.secureCode = this.activatedRoute.snapshot.data.code;
    if (this.secureCode) {
      this.codeSent = true;
      this.authSrv.httpSrv.notificationSrv.showInfo('Un code confirmation a été envoyé par email, merci de le saisir.');
    }
    this.form = this.fb.group({
      code: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    });
    this.code = this.form.controls.code;
  }

  onSubmit() {
    this.router.navigate([this.authSrv.httpSrv.getRetUrl()]);
  }

}
