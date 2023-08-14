import { Component, OnInit } from '@angular/core';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';


@Component({
  selector: 'app-reclamation-payment',
  templateUrl: './reclamation-payment.component.html',
  styleUrls: ['./reclamation-payment.component.scss']
})
export class ReclamationPaymentComponent implements OnInit {

  constructor(private paiementEtudSrv : PaiementEtudiantService) { }

  data: any[] = [];

  reclamations : any

  ngOnInit() {
    this.paiementEtudSrv.getReclamations().subscribe(
      (data) => {
        this.reclamations = data.content
        // console.log(this.reclamations)
      },
      (error) =>{
        console.error(error)
      }
    )
  }
}
