import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-confirmation',
  template: '<p-toast></p-toast>',
})
export class ConfirmationComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    this.authSrv.confirmRegistration(this.activatedRoute.snapshot.params.id)
      .subscribe((data: any) => {
        this.notificatonSrv.showSuccess("Le compte associé au mail " + data.email + " est confirmé. Merci de vous connecter avec vos identifiants");
        this.router.navigate(['login']);
      }, error => {
        this.authSrv.httpSrv.handleError(error);
      });
  }

  constructor(public authSrv: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router, public notificatonSrv: NotificationService) { }



}
