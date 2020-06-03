import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportService } from 'src/app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ReclamationBourse } from '../reclamation_bourse';
import { ReclamationBourseService } from '../reclamation_bourse.service';
import { reclamation_bourseColumns, allowedReclamationBourseFieldsForFilter } from '../reclamation_bourse.columns';
import { BourseEtudiant } from '../../bourse_etudiant';


@Component({
  selector: 'app-reclamation-bourse-list',
  templateUrl: './reclamation_bourse-list.component.html',
  styleUrls: ['./reclamation_bourse-list.component.scss']
})
export class ReclamationBourseListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  reclamationBourses: ReclamationBourse[] = [];
  bourses: BourseEtudiant[] = [];
  selectedReclamationBourses: ReclamationBourse[];
  selectedReclamationBourse: ReclamationBourse;
  clonedReclamationBourses: ReclamationBourse[];

  cMenuItems: MenuItem[] = [];

  tableColumns = reclamation_bourseColumns;
  // allowed fields for filter
  globalFilterFields = allowedReclamationBourseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
              public reclamationBourseSrv: ReclamationBourseService, public exportSrv: ExportService,
              private router: Router, public authSrv: AuthService,
              public notificationSrv: NotificationService) { }

  ngOnInit() {
    if (this.authSrv.checkShowAccess('ReclamationBourse')) {
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye',
       command: (event) => this.viewReclamationBourse(this.selectedReclamationBourse) });
    }
    if (this.authSrv.checkEditAccess('ReclamationBourse')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil',
      command: (event) => this.editReclamationBourse(this.selectedReclamationBourse) });
    }
    if (this.authSrv.checkCloneAccess('ReclamationBourse')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone',
       command: (event) => this.cloneReclamationBourse(this.selectedReclamationBourse) });
    }
    if (this.authSrv.checkDeleteAccess('ReclamationBourse')) {
      this.cMenuItems.push({ label: 'Supprimer', icon:
      'pi pi-times', command: (event) => this.deleteReclamationBourse(this.selectedReclamationBourse) });
    }

    this.reclamationBourses = this.activatedRoute.snapshot.data.reclamationBourses;
    // this.bourses = this.activatedRoute.snapshot.data.bourses;
  }

  viewReclamationBourse(reclamationBourse: ReclamationBourse) {
      this.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), reclamationBourse.id]);

  }

  editReclamationBourse(reclamationBourse: ReclamationBourse) {
      this.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), reclamationBourse.id, 'edit']);
  }

  cloneReclamationBourse(reclamationBourse: ReclamationBourse) {
      this.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), reclamationBourse.id, 'clone']);
  }

  deleteReclamationBourse(reclamationBourse: ReclamationBourse) {
      this.reclamationBourseSrv.remove(reclamationBourse)
        .subscribe(data => this.refreshList(), error => this.reclamationBourseSrv.httpSrv.handleError(error));
  }

  deleteSelectedReclamationBourses(reclamationBourse: ReclamationBourse) {
    this.reclamationBourseSrv.removeSelection(this.selectedReclamationBourses)
      .subscribe(data => this.refreshList(), error => this.reclamationBourseSrv.httpSrv.handleError(error));
  }

  refreshList() {
    this.reclamationBourseSrv.findMesReclamations()
      .subscribe((data: any) => this.reclamationBourses = data, error => this.reclamationBourseSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.reclamationBourses, 'reclamationBourses');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.reclamationBourses);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

}
