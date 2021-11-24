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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
    paiementValidateErrorMessage: string = '';
    ispaiementValidationValid = false;
    montant = 0;

    constructor(
        public activatedRoute: ActivatedRoute,
        public inscriptionAcadSrv: InscriptionacadService,
        public aiementfraisencadrementSrv: PaiementfraisencadrementService,
        public etudiantSrv: EtudiantService,
        private modalService: NgbModal) {
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

    doFilter(value: string): void {
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

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    validateNbrMois(value: number){
        if(!value){
            this.paiementValidateErrorMessage = 'Veuillez saisire le nombre de mois';
            this.ispaiementValidationValid = false;
            return;
        }else if(value*this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite > (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye)){
            this.paiementValidateErrorMessage = 'Le nombre de mois doit être inférieur ou égale à ' + (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye)/this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite;
            this.ispaiementValidationValid = false;
            return;
        }
        this.ispaiementValidationValid = true;


    }

    validateMontantAPaye(value: number){
        if(!value){
            this.paiementValidateErrorMessage = 'Veuillez saisire le montant à payé';
            this.ispaiementValidationValid = false;
            return;
        }else if(value > (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye)){
            this.paiementValidateErrorMessage = 'Le montant doit être inférieur ou égale à ' + (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye);

            this.ispaiementValidationValid = false;
            return;

        }
        this.ispaiementValidationValid = true;

    }

    startPaymentProcess(){
        let motantfinale = this.montant;
        if(this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite){
            motantfinale = this.montant * this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite;
        }
        console.log(motantfinale);
    }

}
