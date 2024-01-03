import { Component, OnInit } from '@angular/core';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historic-payment-list',
  templateUrl: './historic-payment-list.component.html',
  styleUrls: ['./historic-payment-list.component.scss']
})
export class HistoricPaymentListComponent implements OnInit {

  paiements: any[] = [];

  constructor(private paiementEtudiantService: PaiementEtudiantService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPaiements(this.activatedRoute.snapshot.params.id);
  }

  getPaiements(inscriptionId: number): void {
    this.paiementEtudiantService.getPayments(inscriptionId).subscribe(
      (data) => {
        this.paiements = data.content;
      },
      (error) => {
        console.error("Erreur lors de la récupération des données:", error)
      }
    );

  }
}
