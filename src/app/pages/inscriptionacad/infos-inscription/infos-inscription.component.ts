import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Specialite } from '../../specialite/specialite';
import { Preinscription } from '../../preinscription/preinscription';
import { SpecialiteService } from '../../specialite/specialite.service';
import { RegimeinscriptionService } from '../../regimeinscription/regimeinscription.service';
import { Regimeinscription } from '../../regimeinscription/regimeinscription';
import { Etudiant } from '../../etudiant/etudiant';
import { Modepaiement } from '../../modepaiement/modepaiement';
import { ModepaiementService } from '../../modepaiement/modepaiement.service';
import { InscriptionTemporaire } from '../inscription_temporaire/inscription_temporaire';
import { InscriptionTemporaireService } from '../inscription_temporaire/inscription_temporaire.service';

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
  @Input() inscriptionTemporaire: InscriptionTemporaire = new InscriptionTemporaire();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onPrevious: EventEmitter<any> = new EventEmitter();

  constructor(public specialiteSrv: SpecialiteService,
    public regimeinscriptionSrv: RegimeinscriptionService,
    public inscriptionTemporaireSrv: InscriptionTemporaireService,
    public modepaiementSrv: ModepaiementService) {
    if (!this.inscriptionTemporaire.id) {
      this.inscriptionTemporaire = new InscriptionTemporaire();
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
      this.inscriptionTemporaire.montantinscriptionacad = Math.round(montantPlusFrais);
      this.inscriptionTemporaire.idregimeinscription = this.preinscription.idregimeinscription.id;
      this.inscriptionTemporaire.numquittance = this.preinscription.numeroTransaction;
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
    this.inscriptionTemporaire.passage = this.preinscription.passage;
    this.inscriptionTemporaire.preinscirptionId = this.preinscription.id;
    this.inscriptionTemporaire.source = 'spet';
    this.inscriptionTemporaire.idregimeinscription = this.preinscription.idregimeinscription.id;
    this.inscriptionTemporaire.montantinscriptionacad = this.preinscription.montant;
    this.inscriptionTemporaire.numquittance = this.preinscription.numeroTransaction;
    this.inscriptionTemporaireSrv.create(this.inscriptionTemporaire)
      .subscribe((data: any) => {
        this.inscriptionTemporaire = data;
        this.onSave.emit(data);
      }, error => this.inscriptionTemporaireSrv.httpSrv.handleError(error));
  }

  updateInscription() {
    this.inscriptionTemporaire.idregimeinscription = this.inscriptionTemporaire.idregimeinscription.id;
    this.inscriptionTemporaire.idspecialite = this.inscriptionTemporaire.idspecialite.id;
    this.inscriptionTemporaire.idmodepaiement = this.inscriptionTemporaire.idmodepaiement.id;
    this.inscriptionTemporaire.source = 'spet';
    this.inscriptionTemporaire.montantinscriptionacad = this.preinscription.montant;
    this.inscriptionTemporaireSrv.update(this.inscriptionTemporaire)
      .subscribe((data: any) => {
        this.inscriptionTemporaire = data;
        this.onSave.emit(data);
      }, error => this.inscriptionTemporaireSrv.httpSrv.handleError(error));
  }

  goToPrevious() {
    this.onPrevious.emit();
  }

}
