import { Component, OnInit } from '@angular/core';
import { Inscriptionacad } from '../inscriptionacad/inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad/inscriptionacad.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mon-parcours',
  templateUrl: './mon-parcours.component.html',
  styleUrls: ['./mon-parcours.component.scss']
})
export class MonParcoursComponent implements OnInit {
  public type: string = 'grid';
  public searchText: string;
  inscriptions: Inscriptionacad[] = [];
  constructor(public inscriptionAcadSrv: InscriptionacadService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inscriptions = this.activatedRoute.snapshot.data['inscriptions'];
  }

  public toggle(type) {
    this.type = type;
  }

}
