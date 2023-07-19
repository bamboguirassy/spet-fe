import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FraisEncadrementStatusService {

  constructor() { }
  data = [
    { id: 1, montant: 600000, montant_paye: 200000, montant_restant: 400000, nombre_tranche:6, nombre_tranche_rest :4 , etat:'non' }
  ];

  private url :any;

  getFraisEncadrementStatus(){
    this.url ="http://127.0.0.1:8000/api/get-paiement-details/44798";
    return this.data;
  }
}
