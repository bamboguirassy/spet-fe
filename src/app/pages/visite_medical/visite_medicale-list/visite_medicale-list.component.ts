import { Component, Input, OnInit } from "@angular/core";
import { VisiteMedicale } from "../visite_medicale";
import { Router } from "@angular/router";
import { ExportService } from "src/app/shared/services/export.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { Etudiant } from "../../etudiant/etudiant";
import { EtudiantService } from "../../etudiant/etudiant.service";
import { finalize, first } from "rxjs/operators";
import { AnneeacadService } from "../../anneeacad/anneeacad.service";
import { Anneeacad } from "../../anneeacad/anneeacad";
import { Inscriptionacad } from "../../inscriptionacad/inscriptionacad";
import { InscriptionacadService } from "../../inscriptionacad/inscriptionacad.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {
  allowedVisiteMedicaleFieldsForFilter,
  visiteMedicaleColumns,
} from "../visite_medicale.columns";
import { VisiteMedicaleService } from "../visite_medicale.service";

@Component({
  selector: "app-visitemedicale-list",
  templateUrl: "./visite_medicale-list.component.html",
  styleUrls: ["./visite_medicale-list.component.scss"],
})
export class VisiteMedicaleListComponent implements OnInit {
  @Input() visiteMedicales: VisiteMedicale[];
  globalFilterFields = allowedVisiteMedicaleFieldsForFilter;
  selectedVisiteMedicales: VisiteMedicale[] = [];
  selectedVisiteMedicale: VisiteMedicale;
  tableColumns = visiteMedicaleColumns;
  constructor(
    public visiteMedicalSrv: VisiteMedicaleService,
    public exportSrv: ExportService
  ) {}

  ngOnInit() {}

  refreshList() {
    this.visiteMedicalSrv.findAll().subscribe(
      (data: any) => (this.visiteMedicales = data),
      (error) => this.visiteMedicalSrv.httpSrv.handleError(error)
    );
  }

  viewVisiteMedicale(visiteMedicale: VisiteMedicale) {}

  exportPdf() {
    this.exportSrv.exportPdf(
      this.tableColumns,
      this.visiteMedicales,
      "visite-medicales"
    );
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.visiteMedicales);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    this.exportSrv.saveAsExcelFile(buffer, fileName);
  }
}
