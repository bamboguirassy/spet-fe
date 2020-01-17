import { Component, OnInit, Input } from '@angular/core';
import { Inscriptionacad } from '../../inscriptionacad/inscriptionacad';

@Component({
  selector: 'parcours-item',
  templateUrl: './parcours-item.component.html',
  styleUrls: ['./parcours-item.component.scss']
})
export class ParcoursItemComponent implements OnInit {

  @Input() inscription: Inscriptionacad;
  constructor() { }

  ngOnInit() {
  }

}
