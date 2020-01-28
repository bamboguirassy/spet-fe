import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { PaysService } from '../../pays/pays.service';

@Component({
  selector: 'update-perso-info',
  templateUrl: './update-perso-info.component.html',
  styleUrls: ['./update-perso-info.component.scss']
})
export class UpdatePersoInfoComponent implements OnInit {
  @Input() etudiant: Etudiant;
  situationMatrimoniales: any[] = [];
  handicaps: any[] = [];
  orphelins: any[] = [];
  typeHandicaps: any[] = [];
  pays: any[] = [];
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  constructor(public etudiantSrv: EtudiantService,
    public paysSrv: PaysService) { }

  ngOnInit() {
    this.getSituationMatrimonialeValues();
    this.getHandicapValues();
    this.getOrphelinValues();
    this.getTypeHandicapValues();
    this.getPays();
  }

  getSituationMatrimonialeValues() {
    this.etudiantSrv.getSituationMatrimonialeValues()
      .subscribe((data: any) => {
        this.situationMatrimoniales = data;
      }, error => this.etudiantSrv.httpSrv.handleError(error));
  }

  getHandicapValues() {
    this.etudiantSrv.getHandicapValues()
      .subscribe((data: any) => {
        this.handicaps = data
      }, error => this.etudiantSrv.httpSrv.handleError(error));

  }

  getOrphelinValues() {
    this.etudiantSrv.getOrphelinValues()
      .subscribe((data: any) => {
        this.orphelins = data
      }, error => this.etudiantSrv.httpSrv.handleError(error));

  }

  getTypeHandicapValues() {
    this.etudiantSrv.getTypeHandicapValues()
      .subscribe((data: any) => {
        this.typeHandicaps = data
      }, error => this.etudiantSrv.httpSrv.handleError(error));
  }

  getPays() {
    this.paysSrv.findAll()
      .subscribe((data: any) => {
        this.pays = data;
        this.etudiant.adpays = this.pays.find(pay => {
          return pay.alpha2 == 'SN';
        });
      },
        error => this.paysSrv.httpSrv.handleError(error));
  }

  updateEtudiant() {
    this.etudiant.adpays = this.etudiant.adpays.id;
    this.etudiantSrv.update(this.etudiant)
      .subscribe((data: any) => {
        this.etudiant = data;
        this.onUpdate.emit(data);
      },
        error => {
          this.etudiantSrv.httpSrv.handleError(error);
        });
  }

}
