import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';

@Component({
  selector: 'app-frais-encadrement-status',
  templateUrl: './frais-encadrement-status.component.html',
  styleUrls: ['./frais-encadrement-status.component.scss']
})
export class FraisEncadrementStatusComponent implements OnInit {

  data: any[] = [];

  details: any;

  @Output() openPaiementTemp: EventEmitter<any> = new EventEmitter();

  constructor(private statusService: FraisEncadrementStatusService,
    private paiementService: PaiementEtudiantService, public activatedRoute: ActivatedRoute) { }

  statutPaiement: any = {}; // Initialisation par défaut
  paiements: any;

  ngOnInit() {
    this.data = this.statusService.getFraisEncadrementStatus(this.activatedRoute.snapshot.params.id);

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

  gotoPaymentTempTab() {
    this.openPaiementTemp.emit(null);
  }

}
