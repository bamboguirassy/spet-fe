import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-frais-encadrement-main-page',
  templateUrl: './frais-encadrement-main-page.component.html',
  styleUrls: ['./frais-encadrement-main-page.component.scss']
})
export class FraisEncadrementMainPageComponent implements OnInit {

  selectedTabIndex = 0;

  onTabChange(event) {
    // Faites ici ce que vous souhaitez lorsque l'utilisateur change d'onglet
  }

  activerOnglet(ongletIndex: number) {
    this.selectedTabIndex = ongletIndex;
  }
  constructor() { }

  ngOnInit() {
  }

}
