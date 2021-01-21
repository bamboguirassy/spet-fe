import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FosUser } from '../../fos_user/fos_user';
import { DocumentEtudiant } from '../../typedocument/documentetudiant';
import { Etudiant } from '../etudiant';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-dossier-etudiant',
  templateUrl: './dossier-etudiant.component.html',
  styleUrls: ['./dossier-etudiant.component.scss']
})
export class DossierEtudiantComponent implements OnInit {

  public modalRef: NgbModalRef;
  public form: FormGroup;
  @Input() etudiant: Etudiant;
  user: FosUser;
  content: any;
  selectedRegion: any;
  selectedSituationMatromoniale: any;
  selectedHandicap: any;
  selectedTypeHandicap: any;
  selectedOrphelin: any;
  selectedTypeOrphelin: any;
  updateForm: Etudiant;


  currentUser: FosUser;

  tabs = [1, 2, 3];


  regions = [
    { value: 'Dakar', label: 'Dakar' },
    { value: 'Thies', label: 'Thies' },
    { value: 'Diourbel', label: 'Diourbel' },
    { value: 'Kaolack', label: 'Kaolack' },
    { value: 'Fatick', label: 'Fatick' },
    { value: 'Kaffrine', label: 'Kaffrine' },
    { value: 'Louga', label: 'Louga' },
    { value: 'Saint Louis', label: 'Saint Louis' },
    { value: 'Matam', label: 'Matam' },
    { value: 'Ziguinchor', label: 'Ziguinchor' },
    { value: 'Sedhiou', label: 'Sedhiou' },
    { value: 'Kolda', label: 'Kolda' },
    { value: 'Kedougou', label: 'Kedougou' },
    { value: 'Tambacounda', label: 'Tambacounda' },
    { value: 'Exterieur', label: 'Exterieur' }

  ];

  situationMatrimoniales = [
    { value: 'C', label: 'Célibataire' },
    { value: 'M', label: 'Marié (e)' },
    { value: 'D', label: 'Divorcé (e)' },
    { value: 'V', label: 'Veuf (ve)' }
  ];

  handicaps = [
    { value: 'Non', label: 'Non' },
    { value: 'Oui', label: 'Oui' },
  ];

  orphelins = [
    { value: 'Non', label: 'Non' },
    { value: 'Oui', label: 'Oui' },
  ];

  handicapTypes = [
    { type: 'Handicap mental (ou déficience intellectuelle)', libelle: 'Handicap mental (ou déficience intellectuelle' },
    { type: 'Handicap auditif', libelle: 'Handicap auditif' },
    { type: 'Handicap visuel', libelle: 'Handicap visuel' },
    { type: 'Handicap moteur', libelle: 'Handicap moteur' },
    { type: 'Autisme et Troubles Envahissants du Développement', libelle: 'Autisme et Troubles Envahissants du Développement' },
    { type: 'Handicap Psychique', libelle: 'Handicap Psychique' },
    { type: 'Plurihandicap', libelle: 'Plurihandicap' },
    { type: 'Polyhandicap', libelle: 'Polyhandicap' },
    { type: 'Traumatismes crâniens', libelle: 'Traumatismes crâniens' },
    { type: 'Maladies dégénératives', libelle: 'Maladies dégénératives' },
    { type: 'Troubles dys', libelle: 'Troubles dys' }

  ];

  typeOrphelins = [
    { type: 'Orphelin de père', libelle: 'Orphelin de père' },
    { type: 'Orphelin de mère', libelle: 'Orphelin de mère' },
    { type: 'Orphelin des deux', libelle: 'Orphelin des deux' },
  ];

  setDefaultValues() {
    // set region de naissance
    this.regions.forEach(region => {
      if (region.value === this.etudiant.regionnaiss) {
        this.selectedRegion = region;
        return;
      }
    });
    // set orphelin
    this.orphelins.forEach(orphelin => {
      if (orphelin.value === this.etudiant.orphelin) {
        this.selectedOrphelin = orphelin;
        return;
      }
    });
    // set type orphelin
    this.typeOrphelins.forEach(typeOrphelin => {
      if (typeOrphelin.type === this.etudiant.typeOrphelin) {
        this.selectedTypeOrphelin = typeOrphelin;
        return;
      }
    });
    // set type handicap
    this.handicapTypes.forEach(typeHandicap => {
      if (typeHandicap.type === this.etudiant.typeHandicap) {
        this.selectedTypeHandicap = typeHandicap;
        return;
      }
    });
    // set handicap
    this.handicaps.forEach(handicap => {
      if (handicap.value === this.etudiant.handicap) {
        this.selectedHandicap = handicap;
        return;
      }
    });
    // set situation matrimoniale
    this.situationMatrimoniales.forEach(situationMatrimoniale => {
      if (situationMatrimoniale.value === this.etudiant.situationMatrimoniale) {
        this.selectedSituationMatromoniale = situationMatrimoniale;
        return;
      }
    });
  }

  constructor(public fb: FormBuilder,
    public modalService: NgbModal,
    public etudiantSrv: EtudiantService,
    public notificationSrv: NotificationService,
    public authSrv: AuthService,
    public router: Router) {

  }

  ngOnInit() {

    this.updateForm = Object.assign({}, this.etudiant);
    this.setDefaultValues();

    this.authSrv.currentUserProvider.subscribe(data => this.currentUser = data);
    this.findUserByEmail();

  }

  public openModal(modalContent, data) {

    this.modalRef = this.modalService.open(modalContent, { size: 'lg' });

    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  ModalSendEmail(content) {
    this.modalService.open(content, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static',
      backdropClass: 'light-blue-backdrop',
      centered: true
    });
  }

  dissmissModal(param: string) {
    this.modalService.dismissAll(param);
  }


  public closeModal() {
    this.modalRef.close();
  }
  public closeModal1() {

    this.modalService.dismissAll('Cross click');

  }

  updateEtudiant() {
    this.updateForm.situationMatrimoniale = this.selectedSituationMatromoniale.value;
    this.updateForm.orphelin = this.selectedOrphelin.value;
    this.updateForm.handicap = this.selectedHandicap.value;
    if (this.selectedHandicap.value === 'Oui') {
      this.updateForm.typeHandicap = this.selectedTypeHandicap.type;
    } else {
      this.updateForm.typeHandicap = '';
      this.updateForm.descriptionHandicap = '';
    }
    if (this.selectedOrphelin.value === 'Oui') {
      this.updateForm.typeOrphelin = this.selectedTypeOrphelin.type;
    } else {
      this.updateForm.typeOrphelin = '';
    }
    this.updateForm.regionnaiss = this.selectedRegion.value;
    if (this.selectedSituationMatromoniale.value !== 'M') {
      this.updateForm.nomconjoint = '';
    }

    this.etudiantSrv.update(this.updateForm)
      .subscribe((data: any) => {
        this.etudiant = data;
        this.updateForm = data;
        this.modalRef.close(data);
        this.etudiantSrv.httpSrv.notificationSrv.showSuccess('Informations mises à jour avec succès');
      }, error => this.etudiantSrv.httpSrv.handleError(error));
  }

  onUploadEnd(documentEtudiant: DocumentEtudiant) {
    this.etudiantSrv.httpSrv.notificationSrv.showSuccess('Document chargé avec succés.')
  }

  findUserByEmail() {
    this.etudiantSrv.findUserByEmail(this.etudiant).subscribe((data: any) => {
      this.user = data;
    }, error => this.etudiantSrv.httpSrv.handleError(error))


  }
  sendEmail() {
    this.etudiantSrv.sendEmail(this.etudiant).subscribe((data: any) => {
      this.etudiant = data;
      this.closeModal1();

    }, error => this.etudiantSrv.httpSrv.handleError(error))
  }

}
