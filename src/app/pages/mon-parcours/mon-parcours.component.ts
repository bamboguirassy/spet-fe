import { Component, OnInit } from '@angular/core';
import { Inscriptionacad } from '../inscriptionacad/inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad/inscriptionacad.service';
import { ActivatedRoute } from '@angular/router';
import { Preinscription } from '../preinscription/preinscription';

@Component({
  selector: 'app-mon-parcours',
  templateUrl: './mon-parcours.component.html',
  styleUrls: ['./mon-parcours.component.scss']
})
export class MonParcoursComponent implements OnInit {
  public type = 'grid';
  public searchText: string;
  inscriptions: Inscriptionacad[] = [];
  preinscriptions: Preinscription[] = [];
  constructor(public inscriptionAcadSrv: InscriptionacadService,
              public activatedRoute: ActivatedRoute) { 
              }

  ngOnInit() {
    this.inscriptions = this.activatedRoute.snapshot.data.inscriptions;
    this.preinscriptions = this.activatedRoute.snapshot.data.preinscriptions;
  }

}
