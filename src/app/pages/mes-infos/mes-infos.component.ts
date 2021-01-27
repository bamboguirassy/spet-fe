import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../etudiant/etudiant.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Etudiant } from '../etudiant/etudiant';
import { ActivatedRoute, Router } from '@angular/router';
import { FosUser } from '../fos_user/fos_user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-mes-infos',
  templateUrl: './mes-infos.component.html',
  styleUrls: ['./mes-infos.component.scss']
})
export class MesInfosComponent implements OnInit {

  etudiant: Etudiant;

  currentUser: FosUser;

  constructor(
    public etudiantSrv: EtudiantService,
    public notificationSrv: NotificationService,
    public activatedRoute: ActivatedRoute,
    public authSrv: AuthService,
    public router: Router) {

  }

  getMonCompte() {
    return this.etudiantSrv.findMonCompteEtudiant()
      .pipe(first())
      .subscribe((data: any) => {
        this.etudiant = data;
      }, error => {
        this.etudiantSrv.httpSrv.handleError(error);
      });
  }

  ngOnInit() {
    this.authSrv.currentUserProvider.subscribe(data => {
      this.currentUser = data;
      if (this.currentUser.idgroup.codegroupe == 'ETU') {
        this.getMonCompte();
      }
    });
  }

}
