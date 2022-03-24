import {Component, OnInit} from '@angular/core';
import {finalize, first} from 'rxjs/operators';
import {ExportService} from 'src/app/shared/services/export.service';
import {Etudiant} from '../../etudiant/etudiant';
import {EtudiantService} from '../../etudiant/etudiant.service';
import {Inscriptionacad} from '../inscriptionacad';
import {InscriptionacadService} from '../inscriptionacad.service';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'app-payant-inscriptionacad-list',
    templateUrl: './payant-inscriptionacad-list.component.html',
    styleUrls: ['./payant-inscriptionacad-list.component.scss']
})
export class PayantInscriptionacadListComponent implements OnInit {
    inscriptionacads: { inscriptionacad: Inscriptionacad, paiementFraisEncadrement: Array<any> }[] = []; //inscriptionacads with paiementfraisencadrement
    temp: { inscriptionacad: Inscriptionacad, paiementFraisEncadrement: Array<any> }[] = [];
    globalFilterFields = [
        'classe',
        'montantPaye',
        'montantRestant',
        'montantAnnuel'
    ];
    tableColumns: Array<{ header: string, field: string, dataKey: string }> = [
        {header: 'Classe', field: 'classe', dataKey: 'classe'},
        {header: 'Montant Payé', field: 'montantPaye', dataKey: 'montantPaye'},
        {header: 'Montant Restant', field: 'montantRestant', dataKey: 'montantRestant'},
        {header: 'Coût annuel', field: 'montantAnnuel', dataKey: 'montantAnnuel'},
    ];
    etudiant: Etudiant;
    paymentCount = 0;
    fetched = false;


    constructor(
        public inscriptionAcadSrv: InscriptionacadService,
        public exportSrv: ExportService,
        public etudiantSrv: EtudiantService,
        public currencyPipe: CurrencyPipe
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

    public calculateRemainingAmount(inscriptionacadMap: any): number | string {
        let remainingAmount: any = inscriptionacadMap.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement != null
            ? ((+inscriptionacadMap.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel) - this.calculatePaidAmounts(inscriptionacadMap))
            : "Inconnu";

        if( typeof remainingAmount === 'number') {
            remainingAmount = this.currencyPipe.transform(remainingAmount,'F CFA','code','3.2-2','fr')
        }
        return  remainingAmount;
    }


    public updateFilter(event: any) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter((d) => d.inscriptionacad.idclasse.libelleclasse.toLowerCase().indexOf(val) !== -1 || false);
        this.inscriptionacads = [...temp];
    }

    private _fetchInscriptionacad(): void {
        this.fetched = false;
        this
            .inscriptionAcadSrv
            .getInscriptionPayantEtudiant(this.etudiant)
            .pipe(finalize(() => this.fetched = true))
            .subscribe((data: any) => {
                this.inscriptionacads = data;
                this.temp = data;
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
