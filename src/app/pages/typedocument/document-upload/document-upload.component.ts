import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etudiant } from '../../etudiant/etudiant';
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
  typeDocuments: Typedocument[];
  selectedTypeDocument: Typedocument;
  selectedDocumentEtudiant: DocumentEtudiant;
  documentEtudiant: DocumentEtudiant = new DocumentEtudiant();
  base64EncodedFile: string | ArrayBuffer;
  fileToUpload: any;
  canUpload = false;
  canView = false;
  associatedDocuments: DocumentEtudiant[] = [];
  otherDocuments: DocumentEtudiant[] = [];
  canShowAutreForm = false;
  canReplaceOther = false;
  @Input() etudiant: Etudiant;
  @Output() uploadEnd: EventEmitter<DocumentEtudiant> = new EventEmitter();
  @ViewChild('documentViewer', { static: true }) documentViewerRef: TemplateRef<any>;
  @ViewChild('otherDocument', { static: true }) otherDocumentRef: TemplateRef<any>;


  constructor(
    public typeDocumentSrv: TypedocumentService, public documentEtudiantSrv: DocumentEtudiantService,
    public modal: NgbModal
  ) { }

  ngOnInit() {
    this.findInputDocuments();
    this.findAssociatedDocument();
  }

  findInputDocuments() {
    this
      .typeDocumentSrv
      .findInputDocuments()
      .subscribe((typeDocuments: any) => {

        this.typeDocuments = typeDocuments;
        const otherTypeDocument = this.typeDocuments.find((td: Typedocument) => td.codetypedocument === 'OTHER');
        this.typeDocuments.push(this.typeDocuments.splice(this.typeDocuments.indexOf(otherTypeDocument), 1)[0]);

      }, error => {
        this.typeDocumentSrv.httpSrv.handleError(error);
      })
  }

  changeListener($event: any, typeDocument: Typedocument, other?: string): void {
    this.selectedTypeDocument = typeDocument;
    this.documentEtudiant.filename = $event.target.files[0].name.split('.')[0];
    this.encodeToBase64($event.target, other);
  }

  encodeToBase64(inputValue: any, other?: string): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64EncodedFile = myReader.result;
      if (other === 'other') {
        this.editOther();
      } else {
        this.uploadFile(this.selectedTypeDocument);
      }
    };
    myReader.readAsDataURL(file);
  }

  uploadFile(typeDocument: Typedocument) {
    this.documentEtudiant.url = (this.base64EncodedFile as string).split(',')[1];
    this.documentEtudiant.etudiant = this.etudiant.id;
    this.documentEtudiant.typeDocument = typeDocument.id;
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
        if (typeDocument.codetypedocument === 'OTHER') {
          this.canView = false;
          this.canShowAutreForm = false;
          this.selectedDocumentEtudiant = documentEtudiant;
          this.displayDocumentViewer(typeDocument);
        }
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });

  }

  showAutreForm(documentEtudiant?: DocumentEtudiant, other?: string) {
    this.canReplaceOther = other === 'other';
    this.canShowAutreForm = !this.canShowAutreForm;
    this.documentEtudiant = documentEtudiant ? { ...documentEtudiant } : new DocumentEtudiant();
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
        this.canView = false;
        this.canShowAutreForm = false;
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });

  }

  findAssociatedDocument() {
    this
      .documentEtudiantSrv
      .findByEtudiant(this.etudiant)
      .subscribe((data: any) => {
        this.associatedDocuments = data;
        this.otherDocuments = this.associatedDocuments.filter(doc => doc.typeDocument.codetypedocument === 'OTHER');
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      });
  }

  delete(typeDocument: Typedocument, documentEtudiant?: DocumentEtudiant) {
    if (!documentEtudiant) {
      documentEtudiant = this.associatedDocuments.find((doc) => doc.typeDocument.codetypedocument === typeDocument.codetypedocument);
    }
    this
      .documentEtudiantSrv
      .remove(documentEtudiant)
      .subscribe((data: any) => {
        this.documentEtudiantSrv.httpSrv.notificationSrv.showSuccess('Suppression réussi');
        this.associatedDocuments = this.associatedDocuments
          .filter((doc) => doc.id !== documentEtudiant.id);
        this.otherDocuments = this.associatedDocuments.filter(doc => doc.typeDocument.codetypedocument === 'OTHER');
        if (this.otherDocuments.length === 0) {
          this.modal.dismissAll();
        }
      }, error => {
        this.documentEtudiantSrv.httpSrv.handleError(error);
      })
  }

  isAlreadyAdded(typeDocument: Typedocument) {
    return this.associatedDocuments.map((doc) => doc.typeDocument.id).includes(typeDocument.id);
  }

  findCorrespondingDocument(typeDocument: Typedocument) {
    return this.associatedDocuments.find((doc) => doc.typeDocument.codetypedocument === typeDocument.codetypedocument);
  }

  displayDocumentViewer(typeDocument: Typedocument) {
    this.selectedDocumentEtudiant = this.associatedDocuments.find((doc) => doc.typeDocument.codetypedocument === typeDocument.codetypedocument);
    this.selectedTypeDocument = typeDocument;
    this.modal.open(this.documentViewerRef, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  displayAutreModal(typeDocument: Typedocument) {
    this.selectedTypeDocument = typeDocument;
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



}
