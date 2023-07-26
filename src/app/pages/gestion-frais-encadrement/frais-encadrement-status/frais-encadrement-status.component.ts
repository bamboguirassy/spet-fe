import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { TemporaryPaymentFormComponent } from 'src/app/pages/gestion-frais-encadrement/temporary-payment-form/temporary-payment-form.component'
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';

@Component({
  selector: 'app-frais-encadrement-status',
  templateUrl: './frais-encadrement-status.component.html',
  styleUrls: ['./frais-encadrement-status.component.scss']
})
export class FraisEncadrementStatusComponent implements OnInit {

  data: any[] = [];

  details: any

  constructor(private statusService: FraisEncadrementStatusService, private modalService: DialogModule, private paiementService: PaiementEtudiantService) { }

  displayModal: boolean = false; // Propriété pour contrôler la visibilité du modal

  ouvrirModal() {
    this.displayModal = true; // Afficher le modal en définissant la propriété à true
  }

  fermerModal() {
    this.displayModal = false; // Fermer le modal en définissant la propriété à false
  }

  statutPaiement: any; // Variable pour stocker les détails du statut de paiement

  inscriptionId: number

  ngOnInit() {
    this.data = this.statusService.getFraisEncadrementStatus();
    this.inscriptionId = 53377;

    this.paiementService.getStatus(this.inscriptionId).subscribe(
      (data) => {
        // Récupérer les détails du statut de paiement depuis l'API et les stocker dans la variable statutPaiement
        this.statutPaiement = data;
        console.log(this.statutPaiement)

      },
      (error) => {
        // Gérer les erreurs de requête ici
        console.error(error);
      }
    );

    // this.details = this.paiementService.getStatus(inscriptionId);
  }

}
