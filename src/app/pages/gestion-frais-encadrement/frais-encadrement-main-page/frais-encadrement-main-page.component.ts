import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-frais-encadrement-main-page',
  templateUrl: './frais-encadrement-main-page.component.html',
  styleUrls: ['./frais-encadrement-main-page.component.scss']
})
export class FraisEncadrementMainPageComponent implements OnInit {

  activeIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  activateIndex(index: number) {
    this.activeIndex = index;
  }

}
