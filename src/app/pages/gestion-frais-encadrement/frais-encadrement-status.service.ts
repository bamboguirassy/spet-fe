import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FraisEncadrementStatusService {

  constructor() { }
  data = [
    { id: 1, montant: 600000, montant_paye: 200000, montant_restant: 400000, nombre_tranche:6, nombre_tranche_rest :4 , etat:'non' }
  ];

  paiements = [
    {id: 1, numero_transaction: "TR243568", moyen_paiement: "paytech-online", montant: 40000, date: "22/01/2023"},
    {id: 2, numero_transaction: "TR243569", moyen_paiement: "touchpay-online", montant: 40000, date: "22/02/2023"},
    {id: 3, numero_transaction: "TR243578", moyen_paiement: "paytech-online", montant: 40000, date: "22/03/2023"},
    {id: 4, numero_transaction: "TR243578", moyen_paiement: "touchpayh-online", montant: 40000, date: "22/05/2023"},
    {id: 5, numero_transaction: "TR243768", moyen_paiement: "paytech-online", montant: 40000, date: "22/05/2023"},
  ]

  private url :any;

  getPaiement(){
    return this.paiements;
  }
  getFraisEncadrementStatus(inscriptionId: number){
    this.url =`https://gfc.uidt.sn/api/get-paiement-details/${inscriptionId}`;
    return this.data;
  }
}
