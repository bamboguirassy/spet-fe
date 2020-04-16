import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { Etudiant } from '../etudiant/etudiant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements AfterViewInit, OnInit {

  etudiant: Etudiant;
  constructor(public acivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.etudiant = this.acivatedRoute.snapshot.data.etudiant;
  }

  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}
