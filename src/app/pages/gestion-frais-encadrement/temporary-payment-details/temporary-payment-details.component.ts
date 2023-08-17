import { Component, OnInit } from '@angular/core';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../etudiant/etudiant.service';
declare var sendPaymentInfos: Function;


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
  codeMoyenPaiement: string;
  agence_code: string;
  secure_code: string;
  email_universitaire: string;
  prenom: string;
  nom: string;

  constructor(private paiementTemporaireService: PaiementTemporaireService,
    private activatedRoute: ActivatedRoute, public etudiantSrv: EtudiantService) {
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
          if (response.content) {
            let details = response.content;
            this.transactionNumber = details.numero_transaction;
            this.amountPaid = details.montant;
            this.paymentMethod = details.nom_moyen_paiement;
            this.date = details.date;
            this.codeMoyenPaiement = details.code_moyen_paiement;
            this.agence_code = details.agence_code;
            this.secure_code = details.secure_code;
            this.email_universitaire = details.email_universitaire;
            this.prenom = details.prenom;
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

  /**
   * Start payment with sendPaymentInfos function
   */
  startPayment(): void {
    if (this.loaded && !this.noTransactionFound && this.codeMoyenPaiement == 'TOUCHPAY') {
      sendPaymentInfos(this.transactionNumber, this.agence_code, this.secure_code, 'univ-thies.sn', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-succeeded', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-failed', this.amountPaid, 'ville', this.email_universitaire, this.prenom, this.nom, '');
    } else {
      console.error("Erreur lors de la récupération des détails de la transaction");
    }
  }

}
