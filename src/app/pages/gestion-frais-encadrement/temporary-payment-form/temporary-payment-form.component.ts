import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FraisEncadrementStatusService } from '../frais-encadrement-status.service';
import { PaiementEtudiantService } from '../services/paiement-etudiant.service';
import { ActivatedRoute } from '@angular/router';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

interface Tranche {
    name: number;
    code: number;
    montant: number;
}
@Component({
    selector: 'app-temporary-payment-form',
    templateUrl: './temporary-payment-form.component.html',
    styleUrls: ['./temporary-payment-form.component.scss']
})
export class TemporaryPaymentFormComponent implements OnInit {
    data: any[] = [];
    statutPaiement: any = {};
    displayModal: boolean = false;
    tranches: Tranche[] = [];
    @Output() openPaiementTemp: EventEmitter<any> = new EventEmitter();

    constructor(
        private statusService: FraisEncadrementStatusService,
        private paiementService: PaiementEtudiantService,
        private activatedRoute: ActivatedRoute,
        public tokenManagerService: TokenManagerService,
        public notificationSrv: NotificationService
    ) { }


    ouvrirModal() {
        this.displayModal = true; // Afficher le modal en définissant la propriété à true
    }

    fermerModal() {
        this.displayModal = false; // Fermer le modal en définissant la propriété à false
    }

    selectedTranche: Tranche | undefined;
    montantAPayer: number | undefined;


    ngOnInit() {
        this.data = this.statusService.getFraisEncadrementStatus(this.activatedRoute.snapshot.params.id);

        this.paiementService.getStatus(this.activatedRoute.snapshot.params.id).subscribe(
            (data) => {
                this.statutPaiement = data.content;

                // Initialisation des tranches en fonction du nombre_tranches_restantes
                this.tranches = [];
                for (let i = 1; i <= this.statutPaiement.nombre_tranches_restantes; i++) {
                    const montantTranche = (i === 1)
                        ? this.statutPaiement.montant_restante / this.statutPaiement.nombre_tranches_restantes
                        : this.statutPaiement.montant_restante / (this.statutPaiement.nombre_tranches_restantes - (i - 1));

                    this.tranches.push({
                        name: i,
                        code: i,
                        montant: montantTranche
                    });
                }
                console.log(this.statutPaiement);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onTrancheSelectionChange() {
        if (this.selectedTranche) {
            this.montantAPayer = this.selectedTranche.montant;
        }
    }

    /**
     * Author: Moussa FOFANA
     * Date: 17/08/2023
     * Description: Permet de payer une tranche
     */
    initPayment() {
        if (this.selectedTranche) {
            this.paiementService.initPayment({ inscription_id: this.activatedRoute.snapshot.params.id, montant: this.montantAPayer, token: this.tokenManagerService.getToken() }).subscribe(
                (response) => {
                    if (response.error) {
                        if (response.validation_error) {
                            this.notificationSrv.showError("Erreur de validation");
                            return;
                        }
                        this.notificationSrv.showError(response.content);
                        this.fermerModal();
                        this.openPaiementTemp.emit();
                        return;
                    }
                    this.notificationSrv.showSuccess("Paiement initialisé avec succès");
                    this.fermerModal();
                    // location.reload();
                    this.openPaiementTemp.emit();
                  
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }
}
