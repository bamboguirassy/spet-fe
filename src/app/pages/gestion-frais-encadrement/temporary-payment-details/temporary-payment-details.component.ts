import { Component, OnInit } from '@angular/core';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { FraisEncadrementStatusService } from '../frais-encadrement-status.service';
import { PaiementEtudiantService } from '../services/paiement-etudiant.service';
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
  telephone : string
  data: any[] = [];

  details: any;

  constructor(private paiementTemporaireService: PaiementTemporaireService,
    private activatedRoute: ActivatedRoute, public etudiantSrv: EtudiantService, private statusService: FraisEncadrementStatusService,
    private paiementService: PaiementEtudiantService) {
    this.noTransactionFound = false;
    this.loaded = false;
  }

  statutPaiement: any = {}; // Initialisation par défaut
  paiements: any;

  ngOnInit(): void {
    
    this.getTransactionDetails(this.activatedRoute.snapshot.params.id);

    this.paiementService.getStatus(this.activatedRoute.snapshot.params.id).subscribe(
      (data) => {
        // Récupérer les détails du statut de paiement depuis l'API et les stocker dans la variable statutPaiement
        this.statutPaiement = data.content;
      },
      (error) => {
        // Gérer les erreurs de requête ici
        console.error(error);
      }
    );
  }




  getTransactionDetails(inscriptionId: number): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours(inscriptionId)
      .then(response => {
        this.loaded = true;
        if (!response.error) {
          if (response.content) {
            let details = response.content;
            console.log(details);
            this.transactionNumber = details.numero_transaction;
            this.amountPaid = details.montant;
            this.paymentMethod = details.nom_moyen_paiement;
            this.date = details.date;
            this.codeMoyenPaiement = details.code_moyen_paiement;
            this.agence_code = details.agence_code;
            this.secure_code = details.secure_code;
            this.email_universitaire = details.email_universitaire;
            this.prenom = details.prenom;
            this.nom = details.nom
            this.telephone = details.telephone
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
      sendPaymentInfos(this.transactionNumber, this.agence_code, this.secure_code, 'univ-thies.sn', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-succeeded', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-failed', this.amountPaid, 'ville', this.email_universitaire, this.prenom, this.nom, this.telephone);
    } else {
      console.error("Erreur lors de la récupération des détails de la transaction");
    }
  }

}
