import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Preinscription } from '../../preinscription/preinscription';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../../etudiant/etudiant';
import { EtudiantService } from '../../etudiant/etudiant.service';
import { MessageService } from 'primeng/api';
import { InscriptionTemporaire } from '../inscription_temporaire/inscription_temporaire';
import { InscriptionTemporaireService } from '../inscription_temporaire/inscription_temporaire.service';
import { InscriptionacadService } from '../inscriptionacad.service';
import { FosUser } from '../../fos_user/fos_user';
import { AuthService } from '../../../shared/services/auth.service';
import { first } from 'rxjs/operators';
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
  inscriptionTemporaire: InscriptionTemporaire;
  preinscription: Preinscription;
  etudiant: Etudiant;
  currentUser: FosUser;

  constructor(private activatedRoute: ActivatedRoute,
    public etudiantSrv: EtudiantService,
    public authSrv: AuthService,
    public inscriptionTemporaireSrv: InscriptionTemporaireService,
     public httpServ: HttpService,
     public inscriptionacadSrv: InscriptionacadService) {
    this.steps = [
      { name: 'Information Personnelle', icon: 'fa-user', active: true, valid: false, hasError: false },
      { name: 'Information Inscription', icon: 'fa-pencil', active: false, valid: false, hasError: false },
      { name: 'Mise à jour photo', icon: 'fa-image', active: false, valid: false, hasError: false },
      { name: 'Paiement des frais', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
    ];
    this.inscriptionTemporaire = new InscriptionTemporaire();
  }

  ngOnInit() {
    this.authSrv.currentUserProvider.pipe(first()).subscribe((user)=>{
      this.preinscription = this.activatedRoute.snapshot.data['preinscription'];
      this.currentUser = user;   
      if(this.currentUser) {
        this.findByCni();
      }   
    })
    this.findinscriptionTemporaireByPreinscription();
  }

  findinscriptionTemporaireByPreinscription() {
    this.inscriptionTemporaireSrv.getInscriptionTempPreinscription(this.preinscription.id)
      .subscribe((data: any) => {
        this.inscriptionTemporaire = data;
      }, error => this.inscriptionTemporaireSrv.httpSrv.handleError(error));
  }

  startPaymentProcess() {
    if (!this.inscriptionTemporaire.id) {
      this.inscriptionTemporaireSrv.httpSrv.notificationSrv.showError("Il faut d'abord valider l'inscription !!!");
    } else {
      let montant = Math.round(((this.preinscription.montant * 100) / (100 - 1.25)) + 5);
      //OLD CONFIG - sendPaymentInfos(this.inscriptionTemporaire.id, 'UNITH11586', '9Cev0^7!4Ikp@_6Wtk%zelWbY_zK9rGQDI2UnE?zfc5jOJfVmc', 'univ-thies.sn', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-succeeded', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-failed', montant, 'ville', this.preinscription.email, this.preinscription.prenometudiant, this.preinscription.nometudiant, this.preinscription.tel);
      sendPaymentInfos(this.inscriptionTemporaire.id, 'UNITH11756', '7^rVpwCjP42Q@b#NGnuahuKAZBP^PqAECTlFLX1Uhu$LhyqY7U', 'univ-thies.sn', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-succeeded', this.etudiantSrv.httpSrv.getClientUrl() + 'payment-failed', montant, 'ville', this.preinscription.email, this.preinscription.prenometudiant, this.preinscription.nometudiant, '');
    }
  }

  findByCni() {

    if (this.preinscription) {
      this.etudiantSrv.findByCni(this.preinscription.cni)
        .subscribe((data: any) =>{
           this.etudiant = data;
           if(this.etudiant.emailUniv!=this.currentUser.email && this.currentUser.idgroup.codegroupe!='SA') {
             this.authSrv.httpSrv.router.navigate(['/']);
             this.etudiantSrv.httpSrv.notificationSrv.showError("Vous n'êtes pas autorisé à visualiser ces informations !");
             throw new Error("Vous n'êtes pas autorisé à visualiser ces informations !");
           }
        },
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
    if (this.preinscription.paiementConfirme) {
      this.inscriptionacadSrv.confirmPrepaidInscription(this.inscriptionTemporaire)
        .subscribe(() => {
          this.steps.forEach(step => step.valid = true);
          this.confirmed = true;
        }, err => this.inscriptionTemporaireSrv.httpSrv.handleError(err));
    } else {
      this.inscriptionTemporaireSrv.httpSrv.notificationSrv.showError("Le paiement doit être confirmé d'abord !");
    }
  }

  handleInscriptionChange(inscriptionTemporaire: InscriptionTemporaire) {
    this.inscriptionTemporaire = inscriptionTemporaire;
    this.next();
  }

}
