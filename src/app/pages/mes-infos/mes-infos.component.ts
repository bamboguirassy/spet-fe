import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../etudiant/etudiant.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Etudiant } from '../etudiant/etudiant';
import { ActivatedRoute, Router } from '@angular/router';
import { FosUser } from '../fos_user/fos_user';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  ngOnInit() {
    if (this.activatedRoute.snapshot.data.etudiant.error) {
      confirm(this.activatedRoute.snapshot.data.etudiant.error.error.message);
      this.router.navigate(['login']);
    } else {
      this.etudiant = this.activatedRoute.snapshot.data.etudiant;
    }
    this.authSrv.currentUserProvider.subscribe(data => this.currentUser = data);
  }

}
