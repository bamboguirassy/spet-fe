import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Preinscription } from '../../preinscription/preinscription';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { Inscriptionacad } from '../inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad.service';
import { MessageService } from 'primeng/api';
declare var sendPaymentInfos: Function;
@Component({
  selector: 'app-finaliser-inscription',
  templateUrl: './finaliser-inscription.component.html',
  styleUrls: ['./finaliser-inscription.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class FinaliserInscriptionComponent implements OnInit {
  public steps: any[];
  public showConfirm: boolean;
  public confirmed: boolean;
  inscriptionacad: Inscriptionacad;
  preinscription: Preinscription;
  etudiant: Etudiant;

  constructor(private activatedRoute: ActivatedRoute,
    public etudiantSrv: EtudiantService,
    public inscriptionacadSrv: InscriptionacadService, public httpServ: HttpService) {
    this.steps = [
      { name: 'Information Personnelle', icon: 'fa-user', active: true, valid: false, hasError: false },
      { name: 'Information Inscription', icon: 'fa-pencil', active: false, valid: false, hasError: false },
      { name: 'Mise à jour photo', icon: 'fa-image', active: false, valid: false, hasError: false },
      { name: 'Paiement des frais', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
    ];
    this.inscriptionacad = new Inscriptionacad();
  }

  ngOnInit() {
    this.preinscription = this.activatedRoute.snapshot.data['preinscription'];
    this.findByCni();
    this.findInscriptionacadByPreinscription();
  }

  findInscriptionacadByPreinscription() {
    this.inscriptionacadSrv.getInscriptionacadByPreinscription(this.preinscription.id)
      .subscribe((data: any) => {
        this.inscriptionacad = data;
      }, error => this.inscriptionacadSrv.httpSrv.handleError(error));
  }

  startPaymentProcess() {
    if (!this.inscriptionacad.id) {
      this.inscriptionacadSrv.httpSrv.notificationSrv.showError("Il faut d'abord valider l'inscription !!!");
    } else {
      sendPaymentInfos(this.inscriptionacad.id, 'UNITH11586', '9Cev0^7!4Ikp@_6Wtk%zelWbY_zK9rGQDI2UnE?zfc5jOJfVmc', 'univ-thies.sn', this.etudiantSrv.httpSrv.getClientUrl()+'payment-succeeded', this.etudiantSrv.httpSrv.getClientUrl()+'payment-failed', this.preinscription.montant, 'ville', this.preinscription.email, this.preinscription.prenometudiant, this.preinscription.nometudiant, this.preinscription.tel);
    }
  }

  findByCni() {
    if (this.preinscription) {
      this.etudiantSrv.findByCni(this.preinscription.cni)
        .subscribe((data: any) => this.etudiant = data,
          error => this.etudiantSrv.httpSrv.handleError(error));
    } else {
      this.etudiantSrv.httpSrv.notificationSrv.showError("Cni introuvable dans préinscription");
    }
  }

  public next() {

    if (this.steps[this.steps.length - 1].active)
      return false;

    this.steps.some(function (step, index, steps) {
      if (index < steps.length - 1) {
        if (step.active) {
          if (step.name == 'Information Personnelle') {
            step.active = false;
            step.valid = true;
            steps[index + 1].active = true;
            return true;
          }
          if (step.name == 'Information Inscription') {
            step.active = false;
            step.valid = true;
            steps[index + 1].active = true;
            return true;
          }
          if (step.name == 'Mise à jour photo') {
            step.active = false;
            step.valid = true;
            steps[index + 1].active = true;
            return true;
          }
          if (step.name == 'Paiement des frais') {
            step.active = false;
            step.valid = true;
            steps[index + 1].active = true;
            return true;
          }
        }
      }
    });

  }

  public prev() {
    if (this.steps[0].active)
      return false;
    this.steps.some(function (step, index, steps) {
      if (index != 0) {
        if (step.active) {
          step.active = false;
          steps[index - 1].active = true;
          return true;
        }
      }
    });
  }

  public confirm() {
    console.log('testee => '+this.preinscription.paiementConfirme);
    if(this.preinscription.paiementConfirme) {
      this.inscriptionacadSrv.confirmPrepaidInscription(this.inscriptionacad)
      .subscribe(()=>{
        this.steps.forEach(step => step.valid = true);
        this.confirmed = true;
      },err=>this.inscriptionacadSrv.httpSrv.handleError(err));
    } else {
      this.inscriptionacadSrv.httpSrv.notificationSrv.showError("Le paiement doit être confirmé d'abord !");
    }
  }

}
