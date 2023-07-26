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
    const transactionId = "15";
    this.getTemporaryPaymentDetails(transactionId);
  }

  getTemporaryPaymentDetails(transactionId: string): void {
    this.paiementTemporaireService.getPaymentDetails(transactionId).subscribe(
      (response) => {
        // Mettez à jour les propriétés de la classe avec les détails du paiement temporaire
        const details = response.content;
        this.transactionNumber = details.numero_transaction;
        this.amountPaid = details.montant;
        // Vérifier le moyen de paiement et affecter la valeur appropriée à paymentMethod
        if (details.touchpay_param_id === 1) {
          this.paymentMethod = 'Touchpay';
        } else if (details.paytech_param_id === 1) {
          this.paymentMethod = 'Paytech';
        }
        this.date = details.created_at;
      },
      (error) => {
        console.log('Erreur lors de la récupération des détails du paiement temporaire :', error);
      }
    );
  }

}
