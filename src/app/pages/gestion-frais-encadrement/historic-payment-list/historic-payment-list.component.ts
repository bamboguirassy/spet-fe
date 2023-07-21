import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';

@Component({
  selector: 'app-historic-payment-list',
  templateUrl: './historic-payment-list.component.html',
  styleUrls: ['./historic-payment-list.component.scss']
})
export class HistoricPaymentListComponent implements OnInit {

  constructor(private paiementService : FraisEncadrementStatusService) { }

  data: any[] = [];

  ngOnInit() {
    this.data = this.paiementService.getPaiement();
  }

}
