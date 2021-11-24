import {Component, OnInit} from '@angular/core';
import {Inscriptionacad} from '../../inscriptionacad/inscriptionacad';
import {allowedInscriptionacadFieldsForFilter, inscriptionacadColumns} from '../../inscriptionacad/inscriptionacad.columns';
import {Etudiant} from '../../etudiant/etudiant';
import {InscriptionacadService} from '../../inscriptionacad/inscriptionacad.service';
import {ExportService} from '../../../shared/services/export.service';
import {EtudiantService} from '../../etudiant/etudiant.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PaiementfraisencadrementService} from '../paiementfraisencadrement.service';
import {PaiementFraisEncadrememnt} from '../paiementfraisencadrement';
import localeFr from '@angular/common/locales/fr';

@Component({
    selector: 'app-paiementfraisinscription-list',
    templateUrl: './paiementfraisencadrement-list.component.html',
    styleUrls: ['./paiementfraisencadrement-list.component.scss']
})
export class PaiementfraisencadrementListComponent implements OnInit {
    paiementFraisEncadrememnts: PaiementFraisEncadrememnt[] = [];
    paiementFraisEncadrememntsClone: PaiementFraisEncadrememnt[] = [];
    paiementFraisEncadrememntsLength = 0;
    idInscriptionacad: number;
    inscriptionacad: Inscriptionacad;

    globalFilterFields = allowedInscriptionacadFieldsForFilter;
    tableColumns = inscriptionacadColumns;
    etudiant: Etudiant;
    paymentCount = 0;
    montantTotalPaye = 0;

    constructor(
        public activatedRoute: ActivatedRoute,
        public inscriptionAcadSrv: InscriptionacadService,
        public aiementfraisencadrementSrv: PaiementfraisencadrementService,
        public etudiantSrv: EtudiantService) {
    }

    ngOnInit() {
        this.idInscriptionacad = +this.activatedRoute.snapshot.paramMap.get('idInscriptionacad');

        this._fetchCurrentEtudiant();
        this._fetchInscriptionacad();
        this._fetchPaiementfraisInscriptinacad();
    }

    private _fetchInscriptionacad() {
        this.inscriptionAcadSrv.findOne(this.idInscriptionacad)
            .subscribe((data: any) => {

                this.inscriptionacad = data;

            }, err => {
                this.inscriptionAcadSrv.httpSrv.handleError(err);
            });
    }

    private _fetchPaiementfraisInscriptinacad(): void {
        this.aiementfraisencadrementSrv.findAllByInscriptionacadId(this.idInscriptionacad)
            .subscribe((data: any) => {
                this.paiementFraisEncadrememnts = data.paiementfraisencadrements;
                this.paiementFraisEncadrememntsLength = this.paiementFraisEncadrememnts.length;
                this.paiementFraisEncadrememntsClone = [...this.paiementFraisEncadrememnts];
                this.montantTotalPaye = this.paiementFraisEncadrememnts.reduce((acc, current) => acc + current.montantPaye, 0);

            }, err => {
                this.aiementfraisencadrementSrv.httpSrv.handleError(err);
            });
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

    public doFilter(value: string): void {
        if(value){
            this.paiementFraisEncadrememnts = this.paiementFraisEncadrememntsClone.filter((v) => {
                return v.methodePaiement.codemodepaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    v.methodePaiement.libellemodepaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    v.datePaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase());
            });
        }else{
            this.paiementFraisEncadrememnts = [...this.paiementFraisEncadrememntsClone];
        }

    }

}
