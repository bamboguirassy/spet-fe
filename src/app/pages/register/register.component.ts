import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FosUserService } from '../fos_user/fos_user.service';
import { FosUser } from '../fos_user/fos_user';
import { ConfirmationService, DialogService } from 'primeng/api';
import { EmailUpdateComponent } from '../shared/shared-component/email-update/email-update.component';
import { Etudiant } from '../etudiant/etudiant';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements AfterViewInit {
    public router: Router;
    public form: FormGroup;
    public identifiant: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;
    public etudiant: Etudiant;

    constructor(router: Router, fb: FormBuilder,
        public fosUserSrv: FosUserService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService
    ) {
        this.router = router;
        this.form = fb.group({
            identifiant: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
            // email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });

        this.identifiant = this.form.controls.identifiant;
        this.email = this.form.controls.email;
        this.password = this.form.controls.password;
        this.confirmPassword = this.form.controls.confirmPassword;
    }

    public onSubmit(values: any): void {
        if (this.form.valid) {
            this.fosUserSrv.registerEtudiant(values)
                .subscribe((data: any) => {
                    this.etudiant = data;
                    this.confirmationService.confirm({
                        message: `Un mail de confirmation est envoyé
                         à l'adresse email ` + this.etudiant.email +
                            `. Merci de le consulter pour trouver le mail d'activation.
                           Si le mail n'est pas conforme, se présenter à la DSOS 
                            ou à la scolarité de l'établissement pour apporter 
                             les modifications nécessaires. `,
                        accept: () => {
                            const ref = this.dialogService.open(EmailUpdateComponent, {
                                header: 'Mise à jour de l\'adresse email',
                                width: '70%'
                            });
                            ref.onClose.subscribe((user: FosUser) => {
                                if (user) {
                                    this.fosUserSrv.httpSrv.notificationSrv
                                        .showSuccess('Un mail de confirmation est envoyé au nouveau mail indiqué');
                                }
                                this.router.navigate(['login']);
                            });
                        },
                        reject: () => {
                            this.router.navigate(['login']);
                        }
                    });
                },
                    error => this.fosUserSrv.httpSrv.handleError(error));
        }
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}
