import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historic-payment-list',
  templateUrl: './historic-payment-list.component.html',
  styleUrls: ['./historic-payment-list.component.scss']
})
export class HistoricPaymentListComponent implements OnInit {

  transactionNumber: string;
  amountPaid: number;
  paymentMethod: string;
  date: string;

  constructor(private paiementTemporaireService: PaiementTemporaireService,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTransactionEnCoursDetails(this.activatedRoute.snapshot.params.id);
  }

  getTransactionEnCoursDetails(inscriptionId: number): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours(inscriptionId)
      .then(details => {
        console.log("Details : ", details);
        this.transactionNumber = details.content.numero_transaction;
        this.amountPaid = details.content.montant;
        this.paymentMethod = details.content.nom_moyen_paiement;
        this.date = details.content.date;
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails de la transaction :", error);
      });
  }

}

