import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;

    constructor(router: Router, fb: FormBuilder,
        public authSrv: AuthService, private tokenManager: TokenManagerService) {
        this.router = router;
        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.authSrv.login(values)
                .subscribe((data: any) => {
                    this.tokenManager.setToken(data.token);
                    this.authSrv.getCurrentUser();
                    this.router.navigate(['/']);
                }, error => this.authSrv.httpSrv.handleError(error));

        }
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
