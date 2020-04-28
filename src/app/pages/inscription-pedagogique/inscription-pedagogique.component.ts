import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription-pedagogique',
  templateUrl: './inscription-pedagogique.component.html',
  styleUrls: ['./inscription-pedagogique.component.scss']
})
export class InscriptionPedagogiqueComponent implements OnInit {

  data: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.activatedRoute.snapshot.data.inscriptionpedagData;
  }

}
