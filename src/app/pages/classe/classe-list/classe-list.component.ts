import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../classe.service';
import { classeColumns, allowedClasseFieldsForFilter } from '../classe.columns';
import { ExportService } from 'src/app/shared/services/export.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AnneeacadService } from '../../anneeacad/anneeacad.service';


@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent implements OnInit {
  classes: Classe[] = [];
  classe: Classe;
  selectedClasses: Classe[];
  selectedClasse: Classe;
  clonedClasses: Classe[];
  entites: any;
  anneAcads: any;
  selectAnneAcad: any;

  cMenuItems: MenuItem[] = [];

  tableColumns = classeColumns;
  //allowed fields for filter
  globalFilterFields = allowedClasseFieldsForFilter;


  constructor(private activatedRoute: ActivatedRoute,
    public classeSrv: ClasseService, public exportSrv: ExportService,
    private router: Router, public authSrv: AuthService,
    public notificationSrv: NotificationService, public anneAcadSrv: AnneeacadService) { }

  ngOnInit() {
    
    this.getEntites();
    this.getAnneAcads();
    


    if (this.authSrv.checkShowAccess('Classe')) {
      this.cMenuItems.push({ label: 'Afficher détails', icon: 'pi pi-eye', command: (event) => this.viewClasse(this.selectedClasse) });
    }
    if (this.authSrv.checkEditAccess('Classe')) {
      this.cMenuItems.push({ label: 'Modifier', icon: 'pi pi-pencil', command: (event) => this.editClasse(this.selectedClasse) })
    }
    if (this.authSrv.checkCloneAccess('Classe')) {
      this.cMenuItems.push({ label: 'Cloner', icon: 'pi pi-clone', command: (event) => this.cloneClasse(this.selectedClasse) })
    }
    if (this.authSrv.checkDeleteAccess('Classe')) {
      this.cMenuItems.push({ label: 'Supprimer', icon: 'pi pi-times', command: (event) => this.deleteClasse(this.selectedClasse) })
    }

    this.classes = this.activatedRoute.snapshot.data['classes'];
  }

  viewClasse(classe: Classe) {
    this.router.navigate([this.classeSrv.getRoutePrefix(), classe.id]);

  }

  editClasse(classe: Classe) {
    this.router.navigate([this.classeSrv.getRoutePrefix(), classe.id, 'edit']);
  }

  cloneClasse(classe: Classe) {
    this.router.navigate([this.classeSrv.getRoutePrefix(), classe.id, 'clone']);
  }

  deleteClasse(classe: Classe) {
    this.classeSrv.remove(classe)
      .subscribe(data => this.refreshList(), error => this.classeSrv.httpSrv.handleError(error));
  }

  deleteSelectedClasses(classe: Classe) {
    this.classeSrv.removeSelection(this.selectedClasses)
      .subscribe(data => this.refreshList(), error => this.classeSrv.httpSrv.handleError(error));
  }

  refreshList() {
    this.classeSrv.findAll()
      .subscribe((data: any) => this.classes = data, error => this.classeSrv.httpSrv.handleError(error));
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.classes, 'classes');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.classes);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }

  getEntites(){
    this.classeSrv.findEntite().subscribe((data:any)=>{
      this.entites = data;
      console.log(this.entites);
      
    }, error => this.classeSrv.httpSrv.handleError(error))
    
    
  }

  getAnneAcads(){
    this.anneAcadSrv.findAnneeOuvertes()
    .subscribe((data:any)=>{
      this.anneAcads= data;
      this.selectAnneAcad=data[0];
        }, error => this.anneAcadSrv.httpSrv.handleError(error))
  }


}

