import { FosUserService } from './../fos_user.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Etudiant } from '../../etudiant/etudiant';
import { ActivatedRoute } from '@angular/router';
import { FosUser } from '../fos_user';
import { Inscriptionacad } from '../../inscriptionacad/inscriptionacad';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  etudiant: Etudiant;
  newCredentials: {
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string
  } = { currentPassword: '', newPassword: '', newPasswordConfirm: '' };
  canDisplayImageChooser: boolean;
  userImage = '';
  croppedUserImage = '';
  @ViewChild('passwordEditor', { static: false }) passwordEditorModalRef: TemplateRef<any>;
  @ViewChild('imageCropper', { static: false }) imageCropperRef: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute, public authSrv: AuthService, public modalSrv: NgbModal,
    public notificationSrv: NotificationService, private fosUserServ: FosUserService
  ) { }

  ngOnInit() {
    this.etudiant = this.activatedRoute.snapshot.data.etudiant;
  }

  togglePasswordEditor() {
    this.modalSrv.open(this.passwordEditorModalRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  dissmissEditModal(param: string) {
    this.modalSrv.dismissAll(param);
  }

  updatePassword() {
    const { currentPassword, newPassword, newPasswordConfirm } = this.newCredentials;

    if (newPassword.length < 6 || newPasswordConfirm.length < 6) {
      this.notificationSrv.showWarning('Le mot de passe doit faire au moins 6 caractéres.');
    } else if(newPassword !== newPasswordConfirm) {
      this.notificationSrv.showWarning('Les deux mots de passe ne concordent pas.');
    } else {
      this.fosUserServ.changerPassword(this.newCredentials).subscribe(()=>{
        this.notificationSrv.showWarning('Le mot de passe est changé succès.');
        this.newCredentials =  { currentPassword: '', newPassword: '', newPasswordConfirm: '' };
        this.dissmissEditModal('cancel');
      },
          (err)=>{
            console.log(err);
            
          });
    }
  }

  closeModalCropper() {
    this.userImage = '';
    this.croppedUserImage = '';
    this.canDisplayImageChooser = false;
    this.modalSrv.dismissAll('Cross Click');
  }

  handleUserImage(event: any): void {
    this.userImage = event;
    this.modalSrv.open(this.imageCropperRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    this.canDisplayImageChooser = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedUserImage = event.base64;
  }

  loadImageFailed() {
    this.notificationSrv.showError('Impossible de charger l\'image');
  }
}
