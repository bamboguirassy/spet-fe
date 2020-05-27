import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportService } from 'src/app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DemandeDocument } from '../demande_document';
import { DemandeDocumentService } from '../demande_document.service';
import { allowedDemandeDocumentFieldsForFilter, demande_documentColumns } from '../demande_document.columns';


@Component({
  selector: 'app-user-list',
  templateUrl: './demande_document-list.component.html',
  styleUrls: ['./demande_document-list.component.scss']
})
export class DemandeDocumentListComponent implements OnInit {

  demande_documents: DemandeDocument[] = [];
  selectedDemandeDocuments: DemandeDocument[];
  selectedDemandeDocument: DemandeDocument;
  clonedDemandeDocuments: DemandeDocument[];

  cMenuItems: MenuItem[] = [];

  tableColumns = demande_documentColumns;
  // allowed fields for filter
  globalFilterFields = allowedDemandeDocumentFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
              public demande_documentSrv: DemandeDocumentService, public exportSrv: ExportService,
              private router: Router, public authSrv: AuthService,
              public notificationSrv: NotificationService) { }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('DemandeDocument')) {
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewDemandeDocument(this.selectedDemandeDocument) });
    }
    if (this.authSrv.checkEditAccess('DemandeDocument')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editDemandeDocument(this.selectedDemandeDocument) });
    }
    if (this.authSrv.checkCloneAccess('DemandeDocument')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneDemandeDocument(this.selectedDemandeDocument) });
    }
    if (this.authSrv.checkDeleteAccess('DemandeDocument')) {
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteDemandeDocument(this.selectedDemandeDocument) });
    }

    this.demande_documents = this.activatedRoute.snapshot.data.demande_documents;
    console.log(this.demande_documents);
  }

  viewDemandeDocument(demande_document: DemandeDocument) {
      this.router.navigate([this.demande_documentSrv.getRoutePrefix(), demande_document.id]);

  }

  editDemandeDocument(demande_document: DemandeDocument) {
      this.router.navigate([this.demande_documentSrv.getRoutePrefix(), demande_document.id, 'edit']);
  }

  cloneDemandeDocument(demande_document: DemandeDocument) {
      this.router.navigate([this.demande_documentSrv.getRoutePrefix(), demande_document.id, 'clone']);
  }

  deleteDemandeDocument(demande_document: DemandeDocument) {
      this.demande_documentSrv.remove(demande_document)
        .subscribe(data => this.refreshList(), error => this.demande_documentSrv.httpSrv.handleError(error));
  }

  deleteSelectedDemandeDocuments(demande_document: DemandeDocument) {
    this.demande_documentSrv.removeSelection(this.selectedDemandeDocuments)
      .subscribe(data => this.refreshList(), error => this.demande_documentSrv.httpSrv.handleError(error));
  }

  refreshList() {
    this.demande_documentSrv.findAll()
      .subscribe((data: any) => this.demande_documents = data, error => this.demande_documentSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.demande_documents, 'demande_documents');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.demande_documents);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}
