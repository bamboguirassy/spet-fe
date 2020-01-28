import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Preinscription } from '../../preinscription/preinscription';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { Inscriptionacad } from '../inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad.service';

@Component({
  selector: 'app-finaliser-inscription',
  templateUrl: './finaliser-inscription.component.html',
  styleUrls: ['./finaliser-inscription.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    public inscriptionacadSrv: InscriptionacadService) {
    this.steps = [
      { name: 'Information Personnelle', icon: 'fa-user', active: true, valid: false, hasError: false },
      { name: 'Information Inscription', icon: 'fa-pencil', active: false, valid: false, hasError: false },
      { name: 'Mise à jour photo', icon: 'fa-image', active: false, valid: false, hasError: false },
      { name: 'Information Paiement', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
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
          if (step.name == 'Information Paiement') {
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
    this.steps.forEach(step => step.valid = true);
    this.confirmed = true;
  }

}
