import {Component, OnInit} from '@angular/core';
import {Inscriptionacad} from '../../inscriptionacad/inscriptionacad';
import {allowedInscriptionacadFieldsForFilter, inscriptionacadColumns} from '../../inscriptionacad/inscriptionacad.columns';
import {Etudiant} from '../../etudiant/etudiant';
import {InscriptionacadService} from '../../inscriptionacad/inscriptionacad.service';
import {EtudiantService} from '../../etudiant/etudiant.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PaiementfraisencadrementService} from '../paiementfraisencadrement.service';
import {PaiementFraisEncadrememnt} from '../paiementfraisencadrement';
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
    typeEvent: string;
    refCommand: string;
    inscriptionacad: Inscriptionacad;

    globalFilterFields = allowedInscriptionacadFieldsForFilter;
    tableColumns = inscriptionacadColumns;
    etudiant: Etudiant;
    montantTotalPaye = 0;
    paiementValidateErrorMessage: string = '';
    ispaiementValidationValid = false;
    montant = null;

    constructor(
        public activatedRoute: ActivatedRoute,
        public inscriptionAcadSrv: InscriptionacadService,
        public paiementfraisencadrementSrv: PaiementfraisencadrementService,
        public etudiantSrv: EtudiantService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.idInscriptionacad = +this.activatedRoute.snapshot.paramMap.get('idInscriptionacad');
        this.typeEvent = this.activatedRoute.snapshot.paramMap.get('typeEvent');
        this.refCommand = this.activatedRoute.snapshot.paramMap.get('refCommand');
        if (this.typeEvent) {
            if (this.typeEvent == 'success') {
                console.log('thiam1');

                this.inscriptionAcadSrv.httpSrv.notificationSrv.showSuccess('Paiement effectué avec succée');
            } else {
                this.paiementfraisencadrementSrv.cancelPaytechPayment(this.refCommand)
                    .subscribe((data: any) => {
                    }, err => {
                        this.inscriptionAcadSrv.httpSrv.handleError(err);
                    }, () => {
                        this.inscriptionAcadSrv.httpSrv.notificationSrv.showError('Le paiement à été annulé');
                        setTimeout(()=>{
                            window.location.href = 'http://localhost:4200/#/espace-paiement/'+this.idInscriptionacad;
                        },1000)
                    });

            }
        }
        this._fetchCurrentEtudiant();
        this._fetchPaiementfraisInscriptinacad();
    }

    private _fetchPaiementfraisInscriptinacad(): void {
        this.paiementfraisencadrementSrv.findAllByInscriptionacadIdForStudent(this.idInscriptionacad)
            .subscribe((data: any) => {
                this.paiementFraisEncadrememnts = data.paiementfraisencadrements;
                this.montantTotalPaye = data.totalmontantpaye;
                this.inscriptionacad = data.inscriptionacad;
                this.paiementFraisEncadrememntsLength = this.paiementFraisEncadrememnts.length;
                this.paiementFraisEncadrememntsClone = [...this.paiementFraisEncadrememnts];

            }, err => {
                this.paiementfraisencadrementSrv.httpSrv.handleError(err);
            });
    }

    private _fetchCurrentEtudiant(): void {
        this.etudiantSrv.findMonCompteEtudiant()
            .pipe(first())
            .subscribe((data: any) => {
                this.etudiant = data;
            }, error => {
                this.etudiantSrv.httpSrv.handleError(error);
            });
    }

    doFilter(value: string): void {
        if (value) {
            this.paiementFraisEncadrememnts = this.paiementFraisEncadrememntsClone.filter((v) => {
                return v.methodePaiement.codemodepaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    v.methodePaiement.libellemodepaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    v.datePaiement.toLocaleLowerCase().includes(value.toLocaleLowerCase());
            });
        } else {
            this.paiementFraisEncadrememnts = [...this.paiementFraisEncadrememntsClone];
        }

    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.montant = null;
        }, (reason) => {
            this.montant = null;
        });
    }

    validatePaiement(value: number) {
        if (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite) {
            if (!value) {
                this.paiementValidateErrorMessage = 'Veuillez saisire le nombre de mois';
                this.ispaiementValidationValid = false;
                return;
            } else if (value * this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite > (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye)) {
                this.paiementValidateErrorMessage = 'Le nombre de mois doit être inférieur ou égale à ' + (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye) / this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite;
                this.ispaiementValidationValid = false;
                return;
            }
        } else {
            if (!value) {
                this.paiementValidateErrorMessage = 'Veuillez saisire le montant à payé';
                this.ispaiementValidationValid = false;
                return;
            } else if (value > (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye)) {
                this.paiementValidateErrorMessage = 'Le montant doit être inférieur ou égale à ' + (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.fraisAnnuel - this.montantTotalPaye);

                this.ispaiementValidationValid = false;
                return;

            }
        }
        this.ispaiementValidationValid = true;


    }


    async startPaymentProcess(m) {
        let montantfinale = this.montant;
        if (this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite) {
            montantfinale = this.montant * this.inscriptionacad.idclasse.idfiliere.paramFraisEncadrement.mensualite;
        }

        await this.paiementfraisencadrementSrv.initPayment({montant: montantfinale, inscriptionacad: this.inscriptionacad.id})
            .subscribe((data: any) => {
                let a = document.createElement('a');
                a.setAttribute('href', data['redirect_url']);
                a.setAttribute('style', 'display: none');
                a.setAttribute('target', '_blank');
                a.click();
            }, err => {
                this.paiementfraisencadrementSrv.httpSrv.handleError(err);
            });
        m.dismiss();
    }

}
