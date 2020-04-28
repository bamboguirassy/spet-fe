import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dossier-pedagogique',
  templateUrl: './dossier-pedagogique.component.html',
  styleUrls: ['./dossier-pedagogique.component.scss']
})
export class DossierPedagogiqueComponent implements OnInit {

  data: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
