import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaiementTemporaireService } from '../services/paiement-temporaire.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MessageService } from 'primeng/api'; // Importez le service Message de PrimeNG
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';


@Component({
  selector: 'app-reclamation-payment',
  templateUrl: './reclamation-payment.component.html',
  styleUrls: ['./reclamation-payment.component.scss']
})
export class ReclamationPaymentComponent implements OnInit {
  motifReclamation: string = ''; // Pour stocker le motif saisi
  numeroTransaction: string = '';
  messageSucces: string | null = null;
  messageErreur: string | null = null;
  load: boolean

  // Autres propriétés et méthodes...

  @ViewChild('modalReclamation', { static: false }) modalReclamation: any;

  constructor(private paiementEtudSrv: PaiementEtudiantService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    public notificationSrv: NotificationService,
    private paiementTemporaireService: PaiementTemporaireService,
    private messageService: MessageService) { }

  data: any[] = [];

  reclamations: any[] = [];

  getTransactionEnCours(inscriptionId: number): void {
    this.paiementTemporaireService.getDetailsTransactionEnCours(inscriptionId)
      .then(response => {

        if (!response.error) {
          if (response.content) {
            this.load = true;
            let details = response.content;
            this.numeroTransaction = details.numero_transaction;

          } else {
            this.load = false;
          }
          return;
        }
        console.error("Erreur lors de la récupération des détails de la transaction :", response);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails de la transaction :", error);
      });
  }


  ouvrirModalReclamation() {
    this.modalService.open(this.modalReclamation);
  }

  soumettreReclamationAvecMotif(modal: any) {
    // Vous pouvez accéder au motifReclamation ici

    // Appelez la méthode soumettreReclamation() de votre service en incluant le motif
    this.paiementEtudSrv.soumettreReclamation(this.numeroTransaction, this.motifReclamation)
      .subscribe(
        (response: any) => {
          // Vérifiez si la réponse contient un "error" ou une "validation_error"
          if (!response.error && !response.validation_error) {
            // La réclamation a réussi, affichez un message de succès
            console.log('Réclamation soumise avec succès', response);
            this.notificationSrv.showSuccess("Réclamation soumise avec succès");
            console.log(response);
            // mettre à jour la liste des réclamations 
            this.reclamations.push(response.content);
            this.motifReclamation = ''
            // Fermez la modal après la soumission
            modal.dismiss('Fermé');
          } else {
            // La réclamation a échoué, affichez un message d'erreur
            console.error('Erreur lors de la soumission de la réclamation', response);
            let erreur = response.content
            this.notificationSrv.showError("Erreur lors de la soumission de la réclamation : " + erreur);
            this.motifReclamation = ''

          }
        },
        (error) => {
          // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
          let message = error
          this.notificationSrv.showError("Erreur lors de la soumission de la réclamation : " + message);
          console.error('Erreur lors de la soumission de la réclamation', error);
        }
      );

    // Fermez la modal après la soumission
    modal.dismiss('Fermé');
  }


  ngOnInit() {
    this.getTransactionEnCours(this.activatedRoute.snapshot.params.id);
    this.paiementEtudSrv.getReclamations(this.activatedRoute.snapshot.params.id).subscribe(
      (data) => {
        this.reclamations = data.content
        console.log(this.reclamations)
      },
      (error) => {
        console.error(error)
      }
    )
  }
}
