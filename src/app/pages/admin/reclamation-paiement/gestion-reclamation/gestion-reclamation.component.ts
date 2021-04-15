import { Component, OnInit } from '@angular/core';
import { InscriptionacadService } from 'src/app/pages/inscriptionacad/inscriptionacad.service';
import { InscriptionTemporaireService } from 'src/app/pages/inscriptionacad/inscription_temporaire/inscription_temporaire.service';

@Component({
  selector: 'app-gestion-reclamation',
  templateUrl: './gestion-reclamation.component.html',
  styleUrls: ['./gestion-reclamation.component.scss']
})
export class GestionReclamationComponent implements OnInit {

  numdossier: string = '';
  tabPreinscription = [];
  selectedInscriptionTemp: any;
  numTransaction: any;

  constructor(public inscirptionTemporaireSrv: InscriptionTemporaireService,
    public inscriptionacadSrv: InscriptionacadService) { }

  ngOnInit() {
  }

  getInscriptionTempsWithPreinscriptionByNumdossier() {
    this.inscirptionTemporaireSrv.findWithPreinscriptionByNumDossier(this.numdossier)
      .subscribe((data: any) => {
        this.tabPreinscription = data;
      }, err => {
        this.inscirptionTemporaireSrv.httpSrv.handleError(err);
      })
  }

  validatePin() {
    this.inscriptionacadSrv.paymentInstantNotification(this.selectedInscriptionTemp, this.numTransaction)
      .subscribe((data: any) => {
        alert('Réclamation gérée avec succès');
        this.numdossier = '';
        this.tabPreinscription = [];
        this.selectedInscriptionTemp = null;
        this.numTransaction = null;
      }, err => {
        this.inscirptionTemporaireSrv.httpSrv.handleError(err);
      })
  }

  getInscriptionTemps(items: any) {
    let tab = [];
    items.forEach(inscriptionTemporaire => {
      tab.push({ code: inscriptionTemporaire.id, name: 'inscription temp : ' + inscriptionTemporaire.id + '- Montant: ' + inscriptionTemporaire.montantinscriptionacad });
    });
    return tab;
  }

  setSelectedInscriptionTemp(inscriptionTemps: any[]) {
    if (inscriptionTemps.length > 0) {
      this.selectedInscriptionTemp = inscriptionTemps[inscriptionTemps.length - 1];
    }
  }

}
