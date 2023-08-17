import { Component, OnInit } from '@angular/core';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporary-payment-details',
  templateUrl: './temporary-payment-details.component.html',
  styleUrls: ['./temporary-payment-details.component.scss']
})

export class TemporaryPaymentDetailsComponent implements OnInit {

  transactionNumber: string;
  amountPaid: number;
  paymentMethod: string;
  date: string;
  noTransactionFound: boolean;
  loaded: boolean;

  constructor(private paiementTemporaireService: PaiementTemporaireService,
    private activatedRoute: ActivatedRoute) {
      this.noTransactionFound = false;
      this.loaded = false;
     }

  ngOnInit(): void {
    this.getTransactionDetails(this.activatedRoute.snapshot.params.id);
  }

  getTransactionDetails(inscriptionId: number): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours(inscriptionId)
      .then(response => {
        this.loaded = true;
        if (!response.error) {          
          if(response.content) {
            let details = response.content;
            this.transactionNumber = details.numero_transaction;
            this.amountPaid = details.montant_paye;
            this.paymentMethod = details.moyen_paiement;
            this.date = details.date;
          } else {
            this.noTransactionFound = true;
          }
          return;
        }
        console.error("Erreur lors de la récupération des détails de la transaction :", response);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails de la transaction :", error);
      });
  }

}
