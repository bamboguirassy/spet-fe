import { Component, OnInit, Input } from '@angular/core';
import { Etudiant } from '../../etudiant/etudiant';

@Component({
  selector: 'update-perso-info',
  templateUrl: './update-perso-info.component.html',
  styleUrls: ['./update-perso-info.component.scss']
})
export class UpdatePersoInfoComponent implements OnInit {
  @Input() etudiant: Etudiant;
  constructor() { }

  ngOnInit() {
  }

}
