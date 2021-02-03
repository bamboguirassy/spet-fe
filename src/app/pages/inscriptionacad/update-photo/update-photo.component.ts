import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';

@Component({
  selector: 'update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent implements OnInit {

  title = 'angular-image-uploader';

  @Output() onPrevious: EventEmitter<any> = new EventEmitter();
  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  @Input() etudiant: Etudiant;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  filename: string;
  isLaoder: any;

  constructor(public etudiantSrv: EtudiantService) { }

  ngOnInit() {
  }

  goToPrevious() {
    this.onPrevious.emit();
  }

  uploadPhoto() {
    if (this.croppedImage) {
      this.etudiantSrv.uploadPhoto(this.etudiant, { photo: this.croppedImage.split(',')[1], filename: this.filename })
        .subscribe((data: any) => {
          this.etudiant = data;
          this.onUpload.emit();
        }, err => this.etudiantSrv.httpSrv.handleError(err));
    } else if (!this.etudiant.photoLink) {
      this.etudiantSrv.httpSrv.notificationSrv.showError('Vous devez obligatoirement ajouter une photo d\'identification !');
    } else {
      this.onUpload.emit();
    }
  }

  fileChangeEvent(event: any): void {
    this.isLaoder = true; 
    this.imageChangedEvent = event;
    let file: File = this.imageChangedEvent.target.files[0];
    this.filename = file.name;
    console.log(this.filename);
    this.isLaoder = false; 
    console.log(this.isLaoder+" test");
    
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }
  imageLoaded() {
    // show cropper
    //alert("chargement img....."); 
  }
  cropperReady() {
    // cropper readyng serv  
   // this.isLaoder = false; 
    //alert("chargement photo....."); 
  }
  loadImageFailed() {
    // show message
  }

}
