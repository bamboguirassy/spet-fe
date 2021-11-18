import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalite-paiement',
  templateUrl: './modalite-paiement.component.html',
  styleUrls: ['./modalite-paiement.component.scss']
})
export class ModalitePaiementComponent implements OnInit {

  moyenPaiements = [
    {
      nom: 'Orange Money',
      img: '/assets/img/orange-money.png',
      frais: '500 FCFA',
      conditions: 'Avoir un compte sur la plateforme'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}

