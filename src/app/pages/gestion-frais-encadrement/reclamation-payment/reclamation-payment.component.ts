import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaiementEtudiantService } from 'src/app/pages/gestion-frais-encadrement/services/paiement-etudiant.service';


@Component({
  selector: 'app-reclamation-payment',
  templateUrl: './reclamation-payment.component.html',
  styleUrls: ['./reclamation-payment.component.scss']
})
export class ReclamationPaymentComponent implements OnInit {

  constructor(private paiementEtudSrv : PaiementEtudiantService, private activatedRoute: ActivatedRoute) { }

  data: any[] = [];

  reclamations : any

  ngOnInit() {
    this.paiementEtudSrv.getReclamations(this.activatedRoute.snapshot.params.id).subscribe(
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
