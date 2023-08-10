import { Component, OnInit } from '@angular/core';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';

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


  constructor(private paiementTemporaireService: PaiementTemporaireService) { }
  ngOnInit(): void {
    this.getTransactionDetails();
  }

  getTransactionDetails(): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours()
      .then(details => {
        console.log("Details : ", details);
        this.transactionNumber = details.content.numero_transaction;
        this.amountPaid = details.content.montant_paye;
        this.paymentMethod = details.content.moyen_paiement;
        this.date = details.content.date;
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails de la transaction :", error);
      });
  }

}
