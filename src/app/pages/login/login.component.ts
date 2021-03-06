import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';
import { DialogService } from 'primeng/api';
import { FosUser } from '../fos_user/fos_user';
import { EmailUpdateComponent } from '../shared/shared-component/email-update/email-update.component';
import { FosUserService } from '../fos_user/fos_user.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DialogService]
})
export class LoginComponent implements AfterViewInit {
    public router: Router;
    public form: FormGroup;
    public username: AbstractControl;
    public usernameTmp: string;
    public password: AbstractControl;
    public nextStep: boolean = false;


    constructor(router: Router, fb: FormBuilder,
        public authSrv: AuthService,
        private tokenManager: TokenManagerService,
        public dialogService: DialogService,
        public fosUserSrv: FosUserService,
    ) {
        this.router = router;
        this.form = fb.group({
            username: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.username = this.form.controls.username;
        this.password = this.form.controls.password;
    }

    public onSubmit(values: any): void {
        if (this.form.valid) {
            this.authSrv.login({ username: this.usernameTmp, password: this.password.value })
            .pipe(first())    
            .subscribe((data: any) => {
                    this.tokenManager.setToken(data.token);
                    this.authSrv.getCurrentUser();
                    this.router.navigate(['/']);
                }, error => this.authSrv.httpSrv.handleError(error));

        }
    }

    openEmailChangeComponent() {
        const ref = this.dialogService.open(EmailUpdateComponent, {
            header: 'Mise à jour de l\'adresse email',
            width: '80%'
        });
        ref.onClose.subscribe((user: FosUser) => {
            if (user) {
                this.authSrv.httpSrv.notificationSrv
                    .showSuccess('Un mail de confirmation est envoyé au nouveau mail indiqué');
            }
        });
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    validateAccountByEmail() {
        this
            .fosUserSrv
            .validateAccountByEmail(this.username.value)
            .subscribe((user: any) => {
                this.usernameTmp = this.username.value;
                this.username.disable()
                this.nextStep = true;
            }, error => {
                this.fosUserSrv.httpSrv.handleError(error);
            });
    }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
