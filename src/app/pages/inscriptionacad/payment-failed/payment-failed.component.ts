import { ActivatedRoute } from '@angular/router';
import { Etudiant } from './../../etudiant/etudiant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styles: []
})
export class PaymentFailedComponent implements OnInit {
  etudiant: Etudiant;

  constructor(private acivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.etudiant = this.acivatedRoute.snapshot.data.etudiant;
  }

}
