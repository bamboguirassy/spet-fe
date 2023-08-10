import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';


@Component({
  selector: 'app-historic-payment-list',
  templateUrl: './historic-payment-list.component.html',
  styleUrls: ['./historic-payment-list.component.scss']
})
export class HistoricPaymentListComponent implements OnInit {

  constructor(private paiementService : FraisEncadrementStatusService, private paiementSrv: PaiementEtudiantService) { }

  data: any[] = [];

  paiements : any

  ngOnInit() {
    this.data = this.paiementService.getPaiement();

    this.paiementSrv.getPayments().subscribe(
      (data) => {
        this.paiements = data.content
        console.log(this.paiements)
      },
      (error) =>{
        console.error(error)
      }
    )
  }

}
