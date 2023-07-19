import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import {TemporaryPaymentFormComponent} from 'src/app/pages/gestion-frais-encadrement/temporary-payment-form/temporary-payment-form.component'
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';

@Component({
  selector: 'app-frais-encadrement-status',
  templateUrl: './frais-encadrement-status.component.html',
  styleUrls: ['./frais-encadrement-status.component.scss']
})
export class FraisEncadrementStatusComponent implements OnInit {

  data: any[] = [];

  constructor(private statusService: FraisEncadrementStatusService, private modalService: DialogModule) {}

  displayModal: boolean = false; // Propriété pour contrôler la visibilité du modal

  ouvrirModal() {
    this.displayModal = true; // Afficher le modal en définissant la propriété à true
  }

  fermerModal() {
    this.displayModal = false; // Fermer le modal en définissant la propriété à false
  }
  
  ngOnInit() {
    this.data = this.statusService.getFraisEncadrementStatus();
  }

}
