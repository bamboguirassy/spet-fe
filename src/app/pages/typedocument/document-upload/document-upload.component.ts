import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Etudiant } from '../../etudiant/etudiant';
import { FosUser } from '../../fos_user/fos_user';
import { InscriptionacadService } from '../../inscriptionacad/inscriptionacad.service';
import { DocumentEtudiantService } from '../document-etudiant.service';
import { DocumentEtudiant } from '../documentetudiant';
import { Typedocument } from '../typedocument';
import { TypedocumentService } from '../typedocument.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
  currentUser: FosUser;
  typeDocuments: Typedocument[] = [];
  notAddedTypeDocument: Typedocument[] = [];
  selectedTypeDocument: Typedocument;
  selectedDocumentEtudiant: DocumentEtudiant;
  documentEtudiant: DocumentEtudiant = new DocumentEtudiant();
  base64EncodedFile: string | ArrayBuffer;
  fileToUpload: any;
  associatedDocuments: DocumentEtudiant[] = [];
  otherDocuments: DocumentEtudiant[] = [];
  autreTypeDocument: Typedocument = new Typedocument();
  currentOperation: string;
  canUpload: boolean = false;
  queriedDocumentTitle: string;
  @Input() etudiant: Etudiant;
  @Output() uploadEnd: EventEmitter<DocumentEtudiant> = new EventEmitter();
  @ViewChild('documentViewer', { static: true }) documentViewerRef: TemplateRef<any>;
  @ViewChild('otherDocument', { static: true }) otherDocumentRef: TemplateRef<any>;
  @ViewChild('queryDocument', { static: true }) queryCustomDocumentRef: TemplateRef<any>;
  inscriptionacad: any;


  constructor(
    public typeDocumentSrv: TypedocumentService, public documentEtudiantSrv: DocumentEtudiantService,
    public modal: NgbModal, public authSrv: AuthService,public inscriptionacadSrv: InscriptionacadService
  ) { }

  ngOnInit() {
    this.findInputDocuments();
    this.findAssociatedDocument();
    this.fetchCurrentUser();
    this.findInscriptionacadEncoursByEtudiant();
    
  }

  fetchCurrentUser() {
    this
      .authSrv
      .currentUserProvider
      .subscribe((user: any) => {
        this.currentUser = user;
      }, error => {
        this
          .authSrv
          .httpSrv
          .handleError(error);
      });
  }

  findInputDocuments() {
    this
      .typeDocumentSrv
      .findInputDocuments()
      .subscribe((typeDocuments: any) => {

        this.typeDocuments = typeDocuments.filter(d => d.codetypedocument !== 'OTHER');
        this.autreTypeDocument = typeDocuments.find(d => d.codetypedocument === 'OTHER');
        this.typeDocuments.push(this.typeDocuments.splice(this.typeDocuments.indexOf(this.autreTypeDocument), 1)[0]);

      }, error => {
        this.typeDocumentSrv.httpSrv.handleError(error);
      })
  }

  changeListener($event: any, typeDocument: Typedocument, other?: string): void {
    this.selectedTypeDocument = typeDocument;
    this.documentEtudiant.filename = $event.target.files[0].name.split('.')[0];
    this.encodeToBase64($event.target, other);
  }

  changeListenerForUpdate($event: any): void {
    this.documentEtudiant.filename = $event.target.files[0].name.split('.')[0];
    this.encodeToBase64($event.target, 'other');
  }

  encodeToBase64(inputValue: any, other?: string): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64EncodedFile = myReader.result;
      if (other === 'other') {
        this.editOther();
      } else {
        this.uploadFile();
      }
    };
    myReader.readAsDataURL(file);
  }

  uploadFile() {
    this.documentEtudiant.url = (this.base64EncodedFile as string).split(',')[1];
    this.documentEtudiant.etudiant = this.etudiant.id;
    this.documentEtudiant.typeDocument = this.selectedTypeDocument.id;
    this
      .documentEtudiantSrv
      .create(this.documentEtudiant)
      .subscribe((documentEtudiant: any) => {
        this.documentEtudiant = new DocumentEtudiant();
        this.modal.dismissAll();
        this.uploadEnd.emit(documentEtudiant);
        this.findAssociatedDocument();
        this.fileToUpload = null;
        this.canUpload = false;
        if (this.selectedTypeDocument.codetypedocument === 'OTHER') {
          this.selectedDocumentEtudiant = documentEtudiant;
          this.displayOtherDocumentViewer(documentEtudiant);
        }
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });

  }

  sendMail(typeDocument: Typedocument) {

    this
      .typeDocumentSrv
      .sendMailForQuery(typeDocument, this.etudiant)
      .subscribe((etudiant: any) => {

        this
          .typeDocumentSrv
          .httpSrv
          .notificationSrv
          .showSuccess('Mail envoyé avec succès.');

      }, error => {

        this
          .typeDocumentSrv
          .httpSrv
          .handleError(error);

      });
  }

  sendCustomMail() {

    this
      .typeDocumentSrv
      .sendCustomMail(this.queriedDocumentTitle, this.etudiant)
      .subscribe((etudiant: any) => {

        this
          .modal
          .dismissAll();

        this
          .typeDocumentSrv
          .httpSrv
          .notificationSrv
          .showSuccess('Mail envoyé avec succès.');



      }, error => {

        this
          .typeDocumentSrv
          .httpSrv
          .handleError(error);

      });
  }

  editOther() {
    this.documentEtudiant.url = (this.base64EncodedFile as string).split(',')[1];
    this.documentEtudiant.etudiant = this.documentEtudiant.etudiant.id;
    this.documentEtudiant.typeDocument = this.documentEtudiant.typeDocument.id;
    this
      .documentEtudiantSrv
      .updateOther(this.documentEtudiant)
      .subscribe((documentEtudiant: any) => {
        this.uploadEnd.emit(documentEtudiant);
        this.findAssociatedDocument();
        this.fileToUpload = null;
        this.canUpload = false;
        this.modal.dismissAll();
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });

  }

  findAssociatedDocument() {
    this
      .documentEtudiantSrv
      .findByEtudiant(this.etudiant)
      .subscribe((data: any) => {
        this.associatedDocuments = data.filter(doc => doc.typeDocument.codetypedocument !== 'OTHER');
        this.notAddedTypeDocument = [];
        this.typeDocuments
          .filter(td => td.codetypedocument !== 'OTHER')
          .forEach(td => {
            if (!this.associatedDocuments.map(ad => ad.typeDocument.codetypedocument).includes(td.codetypedocument)) {
              this.notAddedTypeDocument.push(td);
            }
          });
        this.otherDocuments = data.filter(doc => doc.typeDocument.codetypedocument === 'OTHER');
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });
  }

  findInscriptionacadEncoursByEtudiant(){
    if(this.etudiant){
      this.typeDocumentSrv.findInscriptionacadByEnCours(this.etudiant)
        .subscribe((data: any) => {
          this.inscriptionacad = data;
          
        }, error => {
          this.typeDocumentSrv.httpSrv.handleError(error);
        })
    }

  }

  deleteDocumentEtudiant(documentEtudiant: DocumentEtudiant) {
    this
      .documentEtudiantSrv
      .remove(documentEtudiant)
      .subscribe((data: any) => {
        this.documentEtudiantSrv.httpSrv.notificationSrv.showSuccess('Suppression réussi');
        this.associatedDocuments = this.associatedDocuments
          .filter((doc) => doc.id !== documentEtudiant.id);
        this.notAddedTypeDocument.push(documentEtudiant.typeDocument);
        this.notAddedTypeDocument.sort(this.sortAlphaNum);
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      })
  }

  deleteOther(documentEtudiant: DocumentEtudiant) {
    this
      .documentEtudiantSrv
      .remove(documentEtudiant)
      .subscribe((data: any) => {
        this.documentEtudiantSrv.httpSrv.notificationSrv.showSuccess('Suppression réussi');
        this.otherDocuments = this.otherDocuments
          .filter((doc) => doc.id !== documentEtudiant.id);
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      })
  }


  displayDocumentViewer(documentEtudiant: DocumentEtudiant) {
    this.selectedDocumentEtudiant = documentEtudiant;
    this.selectedTypeDocument = documentEtudiant.typeDocument;
    this.modal.open(this.documentViewerRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  displayOtherDocumentViewer(documentEtudiant: DocumentEtudiant) {
    this.selectedDocumentEtudiant = documentEtudiant;
    this.modal.open(this.documentViewerRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  displaySendCustomMail() {
    this.modal.open(this.queryCustomDocumentRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  displayAutreModal(typeDocument: Typedocument, operation?: 'update' | 'create', documentEtudiant?: DocumentEtudiant) {
    this.selectedTypeDocument = typeDocument;
    this.documentEtudiant = { ...documentEtudiant };
    this.currentOperation = operation;
    this.modal.open(this.otherDocumentRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  beforeUpload(event: any) {
    this.fileToUpload = event;
  }

  private sortAlphaNum(a, b) {
  let reA = /[^a-zA-Z]/g;
  let reN = /[^0-9]/g;
  let aA = a.codetypedocument.replace(reA, "");
  let bA = b.codetypedocument.replace(reA, "");
  if (aA === bA) {
    let aN = parseInt(a.replace(reN, ""), 10);
    let bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

}
