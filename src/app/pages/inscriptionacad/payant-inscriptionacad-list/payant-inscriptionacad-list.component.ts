import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ExportService } from 'src/app/shared/services/export.service';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { Inscriptionacad } from '../inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad.service';
import {
  allowedPaiementfraisencadrementFieldsForFilter,
  paiementfraisencadrementColumns
} from '../../paiementfraisencadrement/paiementfraisencadrement.columns';

@Component({
  selector: 'app-payant-inscriptionacad-list',
  templateUrl: './payant-inscriptionacad-list.component.html',
  styleUrls: ['./payant-inscriptionacad-list.component.scss']
})
export class PayantInscriptionacadListComponent implements OnInit {
  inscriptionacads: Inscriptionacad[] = [];
  globalFilterFields = allowedPaiementfraisencadrementFieldsForFilter;
  tableColumns = paiementfraisencadrementColumns;
  etudiant: Etudiant;
  paymentCount = 0;



  constructor(
    public inscriptionAcadSrv: InscriptionacadService,
    public exportSrv: ExportService,
    public etudiantSrv: EtudiantService
  ) {
    this.etudiant = new Etudiant();
  }

  ngOnInit() {
    this._fetchCurrentEtudiant();
  }

  exportPdf() {
    this.exportSrv.exportPdf(this.tableColumns, this.inscriptionacads, 'inscriptionacads');
  }

  exportExcel() {
    this.exportSrv.exportExcel(this.inscriptionacads);
  }

  private _fetchInscriptionacad(): void {
    this.inscriptionAcadSrv.getInscriptionPayantEtudiant(this.etudiant)
      .subscribe((data: any) => {
        this.inscriptionacads = data;
      }, err => { this.inscriptionAcadSrv.httpSrv.handleError(err) });
  }

  private _fetchCurrentEtudiant(): void {
    this.etudiantSrv.findMonCompteEtudiant()
      .pipe(first())
      .subscribe((data: any) => {
        this.etudiant = data;
        this._fetchInscriptionacad();
      }, error => {
        this.etudiantSrv.httpSrv.handleError(error);
      });
  }


}
