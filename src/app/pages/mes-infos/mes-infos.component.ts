import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtudiantService } from '../etudiant/etudiant.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Etudiant } from '../etudiant/etudiant';
import { ActivatedRoute } from '@angular/router';
import { FosUser } from '../fos_user/fos_user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mes-infos',
  templateUrl: './mes-infos.component.html',
  styleUrls: ['./mes-infos.component.scss']
})
export class MesInfosComponent implements OnInit {

  public modalRef: NgbModalRef;
  public form: FormGroup;
  etudiant: Etudiant;

  currentUser: FosUser;

  constructor(public fb: FormBuilder,
    public modalService: NgbModal,
    public etudiantSrv: EtudiantService,
    public notificationSrv: NotificationService,
    public activatedRoute: ActivatedRoute,
    public authSrv: AuthService) { }

  ngOnInit() {
    this.etudiant = this.activatedRoute.snapshot.data['etudiant'];
    this.authSrv.currentUserProvider.subscribe(data => this.currentUser = data);
  }

  public openModal(modalContent, data) {

    this.modalRef = this.modalService.open(modalContent, null);

    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  public closeModal() {
    this.modalRef.close();
  }

  updateEtudiant() {
    this.etudiantSrv.update(this.etudiant)
      .subscribe((data: any) => this.etudiant = data,
        error => this.etudiantSrv.httpSrv.handleError(error));
  }

}
