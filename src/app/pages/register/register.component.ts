import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FosUserService } from '../fos_user/fos_user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
    public router: Router;
    public form: FormGroup;
    public identifiant: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;

    constructor(router: Router, fb: FormBuilder,
        public fosUserSrv: FosUserService) {
        this.router = router;
        this.form = fb.group({
            identifiant: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });

        this.identifiant = this.form.controls['identifiant'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.fosUserSrv.registerEtudiant(values)
                .subscribe((data: any) => {
                    this.fosUserSrv.httpSrv.notificationSrv.showSuccess("Un mail de confirmation est envoyé à " + data.email + ". Merci de le consulter")
                    this.router.navigate(['/login'])
                },
                    error => this.fosUserSrv.httpSrv.handleError(error));
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

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}
