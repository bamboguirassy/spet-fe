import {Component, OnInit} from '@angular/core';
import {finalize, first} from 'rxjs/operators';
import {ExportService} from 'src/app/shared/services/export.service';
import {Etudiant} from '../../etudiant/etudiant';
import {EtudiantService} from '../../etudiant/etudiant.service';
import {Inscriptionacad} from '../inscriptionacad';
import {allowedInscriptionacadFieldsForFilter, inscriptionacadColumns} from '../inscriptionacad.columns';
import {InscriptionacadService} from '../inscriptionacad.service';

@Component({
    selector: 'app-payant-inscriptionacad-list',
    templateUrl: './payant-inscriptionacad-list.component.html',
    styleUrls: ['./payant-inscriptionacad-list.component.scss']
})
export class PayantInscriptionacadListComponent implements OnInit {
    inscriptionacads: { inscriptionacad: Inscriptionacad, paiementFraisEncadrement: Array<any> }[] = []; //inscriptionacads with paiementfraisencadrement
    globalFilterFields = allowedInscriptionacadFieldsForFilter;
    tableColumns = inscriptionacadColumns;
    etudiant: Etudiant;
    paymentCount = 0;
    fetched = false;


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

    public calculatePaidAmounts(inscriptionacad: any): number {
        return inscriptionacad.paiementFraisEncadrements.length == 0
            ? 0
            : inscriptionacad.paiementFraisEncadrements.reduce((acc, current) => {
                return acc + current.montantPaye;
            }, 0);
    }

    public calculateRemainingAmount(inscriptionacadMap: any): number {
        return (+inscriptionacadMap.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel) - this.calculatePaidAmounts(inscriptionacadMap);
    }

    exportPdf() {
        this.exportSrv.exportPdf(this.tableColumns, this.inscriptionacads, 'inscriptionacads');
    }

    exportExcel() {
        this.exportSrv.exportExcel(this.inscriptionacads);
    }

    private _fetchInscriptionacad(): void {
        this.fetched = false;
        this
            .inscriptionAcadSrv
            .getInscriptionPayantEtudiant(this.etudiant)
            .pipe(finalize(() => this.fetched = true))
            .subscribe((data: any) => {
                this.inscriptionacads = data;
                console.log(this.inscriptionacads);
            }, err => {
                this.inscriptionAcadSrv.httpSrv.handleError(err);
            });
    }

    private _fetchCurrentEtudiant(): void {
        this
            .etudiantSrv
            .findMonCompteEtudiant()
            .pipe(
                first(),
            )
            .subscribe((data: any) => {
                this.etudiant = data;
                this._fetchInscriptionacad();
            }, error => {
                this.etudiantSrv.httpSrv.handleError(error);
            });
    }


}
