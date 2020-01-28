import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Etudiant } from '../../etudiant/etudiant';

@Component({
  selector: 'update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent implements OnInit {

  title = 'angular-image-uploader';

  @Input() etudiant: Etudiant;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit() {
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
