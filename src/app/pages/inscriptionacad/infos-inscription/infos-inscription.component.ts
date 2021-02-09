import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Specialite } from '../../specialite/specialite';
import { Inscriptionacad } from '../inscriptionacad';
import { Preinscription } from '../../preinscription/preinscription';
import { SpecialiteService } from '../../specialite/specialite.service';
import { RegimeinscriptionService } from '../../regimeinscription/regimeinscription.service';
import { Regimeinscription } from '../../regimeinscription/regimeinscription';
import { Etudiant } from '../../etudiant/etudiant';
import { InscriptionacadService } from '../inscriptionacad.service';
import { Modepaiement } from '../../modepaiement/modepaiement';
import { ModepaiementService } from '../../modepaiement/modepaiement.service';

@Component({
  selector: 'infos-inscription',
  templateUrl: './infos-inscription.component.html',
  styleUrls: ['./infos-inscription.component.scss']
})
export class InfosInscriptionComponent implements OnInit {
  specialites: Specialite[] = [];
  regimeinscriptions: Regimeinscription[] = [];
  modepaiements: Modepaiement[] = [];
  @Input() preinscription: Preinscription;
  @Input() etudiant: Etudiant;
  @Input() inscriptionacad: Inscriptionacad = new Inscriptionacad();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onPrevious: EventEmitter<any> = new EventEmitter();

  constructor(public specialiteSrv: SpecialiteService,
    public regimeinscriptionSrv: RegimeinscriptionService,
    public inscriptionacadSrv: InscriptionacadService,
    public modepaiementSrv: ModepaiementService) {
    if (!this.inscriptionacad.id) {
      this.inscriptionacad = new Inscriptionacad();
    }
  }

  ngOnInit() {
    this.findSpecialiteByFiliere();
    this.findRegimeInscriptions();
    if (this.preinscription.paiementConfirme) {
      this.modepaiementSrv.findAll()
      .subscribe((data: any) => {
        this.modepaiements = data;
      }, err => this.modepaiementSrv.httpSrv.handleError(err));
      // si paiement déja effectué, mettre le montant payé
      let montantPlusFrais = ((this.preinscription.montant*100)/(100-1.25))+5;
      this.inscriptionacad.montantinscriptionacad = Math.round(montantPlusFrais);
      this.inscriptionacad.idregimeinscription = this.preinscription.idregimeinscription.id;
      this.inscriptionacad.numquittance = this.preinscription.numeroTransaction;

    }
  }

  findSpecialiteByFiliere() {
    this.specialiteSrv.findByFiliere(this.preinscription.idfiliere.id)
      .subscribe((data: any) => {
        this.specialites = data;
      }, error => this.specialiteSrv.httpSrv.handleError(error));
  }

  findRegimeInscriptions() {
    this.regimeinscriptionSrv.findAll()
      .subscribe((data: any) => {
        this.regimeinscriptions = data;
      }, error => this.regimeinscriptionSrv.httpSrv.handleError(error));
  }

  createInscription() {
    this.inscriptionacad.passage = this.preinscription.passage;
    this.inscriptionacad.preinscirptionId = this.preinscription.id;
    this.inscriptionacad.source = 'spet';
    this.inscriptionacad.idregimeinscription = this.preinscription.idregimeinscription.id;
    this.inscriptionacad.montantinscriptionacad = this.preinscription.montant;
    this.inscriptionacad.numquittance = this.preinscription.numeroTransaction;
    this.inscriptionacadSrv.create(this.inscriptionacad)
      .subscribe((data: any) => {
        this.inscriptionacad = data;
        this.onSave.emit(data);
      }, error => this.inscriptionacadSrv.httpSrv.handleError(error));
  }

  updateInscription() {
    this.inscriptionacad.idregimeinscription = this.inscriptionacad.idregimeinscription.id;
    this.inscriptionacad.idspecialite = this.inscriptionacad.idspecialite.id;
    this.inscriptionacad.idmodepaiement = this.inscriptionacad.idmodepaiement.id;
    this.inscriptionacad.source = 'spet';
    this.inscriptionacad.montantinscriptionacad = this.preinscription.montant;
    this.inscriptionacadSrv.update(this.inscriptionacad)
      .subscribe((data: any) => {
        this.inscriptionacad = data;
        this.onSave.emit(data);
      }, error => this.inscriptionacadSrv.httpSrv.handleError(error));
  }

  goToPrevious() {
    this.onPrevious.emit();
  }

}
