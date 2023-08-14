import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';


@Component({
  selector: 'app-historic-payment-list',
  templateUrl: './historic-payment-list.component.html',
  styleUrls: ['./historic-payment-list.component.scss']
})
export class HistoricPaymentListComponent implements OnInit {

  // constructor(private paiementService : FraisEncadrementStatusService) { }
  // constructor(private paiementService : FraisEncadrementStatusService, private paiementSrv: PaiementEtudiantService) { }

  // data: any[] = [];
  // paiements : any

  // ngOnInit() {
  //   this.data = this.paiementService.getPaiement();

  //   this.paiementSrv.getPayments().subscribe(
  //     (data) => {
  //       this.paiements = data.content
  //       console.log(this.paiements)
  //     },
  //     (error) =>{
  //       console.error(error)
  //     }
  //   )
  // }

  transactionNumber: string;
  amountPaid: number;
  paymentMethod: string;
  date: string;

  constructor(private paiementTemporaireService: PaiementTemporaireService) { }

  ngOnInit(): void {
    const transactionId = "15";
    this.getTransactionDetails(transactionId);
  }

  getTransactionDetails(transactionId: string): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours(transactionId)
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

