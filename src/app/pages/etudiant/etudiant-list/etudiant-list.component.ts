import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../etudiant';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.scss']
})
export class EtudiantListComponent implements OnInit {
  etudiants: Etudiant;

  constructor(public etudiantSrv: EtudiantService,public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEtudiant();
  
 
  }
  getEtudiant() {
    this.etudiantSrv.findAll()
      .subscribe((data: any) => {
        this.etudiants = data;
      }, err => this.etudiantSrv.httpSrv.handleError(err));
      console.log(this.etudiants);
  }
  
}
