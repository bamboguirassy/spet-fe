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

  constructor(public etudiantSrv: EtudiantService) { }

  ngOnInit() {
  }

  goToPrevious() {
    this.onPrevious.emit();
  }

  uploadPhoto() {
    this.etudiantSrv.uploadPhoto(this.etudiant, { photo: this.croppedImage.split(',')[1], filename: this.filename})
      .subscribe((data: any) => {
        this.etudiant = data;
        this.onUpload.emit();
      }, err => this.etudiantSrv.httpSrv.handleError(err));
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    let file: File = this.imageChangedEvent.target.files[0];
    this.filename = file.name;
    console.log(this.filename);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
