import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from '../frais-encadrement-status.service';
import { PaiementEtudiantService } from '../services/paiement-etudiant.service';

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

    constructor(
        private statusService: FraisEncadrementStatusService,
        private paiementService: PaiementEtudiantService
    ) { }

    selectedTranche: Tranche | undefined;
    montantAPayer: number | undefined;

 
    ngOnInit() {
        this.data = this.statusService.getFraisEncadrementStatus();
    
        this.paiementService.getStatus().subscribe(
            (data) => {
                this.statutPaiement = data.content;
    
                // Initialisation des tranches en fonction du nombre_tranches_restantes
                this.tranches = [];
                for (let i = 1; i <= this.statutPaiement.nombre_tranches_restantes; i++) {
                    const montantTranche = (i === 1)
                        ? this.statutPaiement.montant_a_payer / this.statutPaiement.nombre_tranches_restantes
                        : this.statutPaiement.montant_a_payer / (this.statutPaiement.nombre_tranches_restantes - (i - 1));
    
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
}
