import { Component, EventEmitter, OnInit } from "@angular/core";
import { VisiteMedicale } from "../visite_medicale";
import { Router } from "@angular/router";
import { VisiteMedicaleService } from "../visite_medicale.service";
import { ExportService } from "src/app/shared/services/export.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { Etudiant } from "../../etudiant/etudiant";
import { EtudiantService } from "../../etudiant/etudiant.service";
import { finalize, first } from "rxjs/operators";
import { AnneeacadService } from "../../anneeacad/anneeacad.service";
import { Anneeacad } from "../../anneeacad/anneeacad";
import { Inscriptionacad } from "../../inscriptionacad/inscriptionacad";
import { InscriptionacadService } from "../../inscriptionacad/inscriptionacad.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FosUser } from '../../fos_user/fos_user';

@Component({
  selector: "app-visitemedicale-new",
  templateUrl: "./visite_medicale-new.component.html",
  styleUrls: ["./visite_medicale-new.component.scss"],
})
export class VisiteMedicaleNewComponent implements OnInit {
  searchInputTouched = false;
  anneeEnCours: Anneeacad;
  searching = false;
  visiteMedicales: VisiteMedicale[] = [];
  selectedInscriptionacad: Inscriptionacad;
  selectedHandicap: any;
  selectedEtudiant: Etudiant;
  selectedPresenceHandicap: any;
  selectedApte: any;
  dateConsultation: NgbDateStruct;
  clonedVisiteMedicales: VisiteMedicale[];
  numeroInterne: number;
  filteredEtudiants: Etudiant[] = [];
  visiteMedicale: VisiteMedicale = new VisiteMedicale();
  created: EventEmitter<any> = new EventEmitter<any>();
  currentUser: FosUser = null;

  statuts = [
    { value: 'Apte', label: "Apte" },
    { value: 'Inapte', label: "Inapte" },
    { value: 'Inaptitude temporaire', label: "Inaptitude temporaire" },
  ];

  presenceHandicaps = [
    { value: "Non", label: "Non" },
    { value: "Oui", label: "Oui" },
  ];

  handicapTypes = [
    {
      type: "Handicap mental (ou déficience intellectuelle)",
      libelle: "Handicap mental (ou déficience intellectuelle)",
    },
    { type: "Handicap auditif", libelle: "Handicap auditif" },
    { type: "Handicap visuel", libelle: "Handicap visuel" },
    { type: "Handicap moteur", libelle: "Handicap moteur" },
    {
      type: "Autisme et Troubles Envahissants du Développement",
      libelle: "Autisme et Troubles Envahissants du Développement",
    },
    { type: "Plurihandicap", libelle: "Plurihandicap" },
    { type: "Traumatismes crâniens", libelle: "Traumatismes crâniens" },
    { type: "Maladies dégénératives", libelle: "Maladies dégénératives" },
    { type: "Troubles dys", libelle: "Troubles dys" },
  ];

  maladieChroniques = [
    { label: 'Asthme', code: 'Asthme' },
    { label: 'Diabète', code: 'Diabète' },
    { label: 'Drépanocytose', code: 'Drépanocytose' },
    { label: 'Hépatites', code: 'Hépatites' },
    { label: 'Insuffisance Rénale', code: 'Insuffisance Rénale' },
    { label: 'Autres', code: 'Autres' },
  ];

  selectedMaladieChroniques = [];

  constructor(
    public visiteMedicaleSrv: VisiteMedicaleService,
    public exportSrv: ExportService,
    private router: Router,
    public authSrv: AuthService,
    public etudiantSrv: EtudiantService,
    public notificationSrv: NotificationService,
    public anneeacadSrv: AnneeacadService,
    public inscriptionacadSrv: InscriptionacadService
  ) {
    this.selectedApte = this.statuts.find((vm) => vm.label === "Apte") as any;
    authSrv.currentUserProvider.pipe(first())
    .subscribe(user=>this.currentUser = user);
  }

  ngOnInit() {
    this.findAnneeEnCours();
  }

  findAnneeEnCours() {
    this.anneeacadSrv
      .findAnneeEncours()
      .pipe(first())
      .subscribe(
        (anneeacad: any) => {
          this.anneeEnCours = anneeacad.shift();
        },
        (error) => {
          this.anneeacadSrv.httpSrv.handleError(error);
        }
      );
  }

  displayMedicalFile(etudiant: Etudiant) {
    this.selectedMaladieChroniques = [];
    this.dateConsultation = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: new Date().getDate(),
    };
    this.selectedApte = this.statuts.find((vm) => vm.label === "Apte") as any;
    this.selectedInscriptionacad = null;
    this.selectedEtudiant = null;
    this.selectedHandicap = null;
    this.selectedPresenceHandicap = null;
    this.visiteMedicale = new VisiteMedicale();
    this.inscriptionacadSrv
      .findEncoursByEtudiant(etudiant)
      .pipe(first())
      .subscribe(
        (inscriptionacad: any) => {
          this.selectedInscriptionacad = inscriptionacad;
          if (this.selectedInscriptionacad.visiteMedicale) {
            this.visiteMedicale = {
              ...this.selectedInscriptionacad.visiteMedicale,
            };
            this.selectedApte = this.statuts.find((vm) => vm.label === this.visiteMedicale.resultat) as any;
            this.visiteMedicale.date = new Date(this.visiteMedicale.date);
            if(this.visiteMedicale.maladieChroniques) {
              this.convertStringToMultiSelectValues(this.visiteMedicale.maladieChroniques);
            }            
            /*this.dateConsultation = {
              year: this.visiteMedicale.date.getFullYear(),
              month: this.visiteMedicale.date.getMonth(),
              day: this.visiteMedicale.date.getDate(),
            }; */
          }
          this.selectedPresenceHandicap = this.presenceHandicaps.find(
            (handicap) =>
              handicap.value.toLowerCase() ===
              this.selectedInscriptionacad.idetudiant.handicap.toLowerCase()
          );
          if (this.selectedPresenceHandicap.value.toLowerCase() === "oui") {
            this.selectedHandicap = this.handicapTypes.find(
              (typeHandicap: any) =>
                typeHandicap.value ===
                this.selectedInscriptionacad.idetudiant.typeHandicap
            );
          }
          this.selectedEtudiant = this.selectedInscriptionacad.idetudiant;
          if (this.selectedEtudiant.typeHandicap) {
            this.selectedHandicap = this.handicapTypes.find(
              (handicap) =>
                handicap.type.toLowerCase() ===
                this.selectedEtudiant.typeHandicap.toLowerCase()
            );
          }
        },
        (error: any) => this.inscriptionacadSrv.httpSrv.handleError(error)
      );
  }

  searchEtudiant() {
    this.searchInputTouched = true;
    this.searching = true;
    if (this.numeroInterne) {
      this.etudiantSrv
        .searchByNumInterne(this.numeroInterne)
        .pipe(
          first(),
          finalize(() => (this.searching = false))
        )
        .subscribe(
          (etudiants: any) => {
            this.filteredEtudiants = etudiants;
            if(this.filteredEtudiants.length<1) {
              this.visiteMedicale = new VisiteMedicale();
              this.selectedInscriptionacad = null;
              this.notificationSrv.showError("Aucun étudiant correspondant trouvé avec ce numero de dossier... Merci de vérifier !");
            } else {
              this.displayMedicalFile(this.filteredEtudiants[0]);
            }
          },
          (error) => {
            this.etudiantSrv.httpSrv.handleError(error);
          }
        );
    }
  }

  remove() {
    if(confirm("Êtes-vous sûr de vouloir supprimer ?")) {
      this.visiteMedicaleSrv.remove(this.visiteMedicale)
      .subscribe(()=>{
        this.visiteMedicale = new VisiteMedicale();
        this.selectedInscriptionacad.visiteMedicale = null;
        this.notificationSrv.showSuccess("Visite supprimée avec succès !");
      });
    }
  }

  updateEtudiantInfos() {
    this.selectedEtudiant.handicap = this.selectedPresenceHandicap.value;
    if (this.selectedHandicap) {
      this.selectedEtudiant.typeHandicap = this.selectedHandicap.type;
    }
    if (this.selectedEtudiant.handicap) {
      this.selectedEtudiant.typeHandicap = null;
    }

    this.etudiantSrv
      .update(this.selectedEtudiant)
      .pipe(first())
      .subscribe(
        (etudiant: any) => {
          this.visiteMedicaleSrv.httpSrv.notificationSrv.showSuccess(
            "Les informations de l'etudiant ont bien été mise à jour."
          );
        },
        (error) => {
          this.visiteMedicaleSrv.httpSrv.handleError(error);
        }
      );
  }

  save() {
    this.visiteMedicale.inscriptionacad = this.selectedInscriptionacad
      .id as any;
    this.visiteMedicale.resultat = this.selectedApte.value;
    this.visiteMedicale.date = new Date(
      `${this.dateConsultation.year}-${this.dateConsultation.month}-${this.dateConsultation.day}`
    );
    if (this.selectedMaladieChroniques.length) {
      this.visiteMedicale.maladieChroniques = this.convertSelectedMaladieChroniquesToString();
    }

    this.visiteMedicaleSrv
      .create(this.visiteMedicale)
      .pipe(first())
      .subscribe(
        (visiteMedicale: any) => {
          this.selectedInscriptionacad.visiteMedicale = visiteMedicale;
          this.visiteMedicale = visiteMedicale;
          this.created.emit(visiteMedicale);
          this.visiteMedicaleSrv.httpSrv.notificationSrv.showSuccess(
            "Vos observations ont bien été enregistrées."
          );
          this.updateEtudiantInfos();
        },
        (error) => {
          this.visiteMedicaleSrv.httpSrv.handleError(error);
        }
      );
  }

  update() {
    this.visiteMedicale.inscriptionacad = this.selectedInscriptionacad
      .id as any;
    this.visiteMedicale.resultat = this.selectedApte.value;
    this.visiteMedicale.date = new Date(
      `${this.dateConsultation.year}-${this.dateConsultation.month}-${this.dateConsultation.day}`
    );
    if (this.selectedMaladieChroniques.length) {
      this.visiteMedicale.maladieChroniques = this.convertSelectedMaladieChroniquesToString();
    }
    if(this.selectedHandicap) {
      this.visiteMedicale.typeHandicap = this.selectedHandicap.type;
    }
    this.visiteMedicaleSrv
      .update(this.visiteMedicale)
      .pipe(first())
      .subscribe(
        (visiteMedical: any) => {
          this.selectedInscriptionacad.visiteMedicale = visiteMedical;
          this.visiteMedicaleSrv.httpSrv.notificationSrv.showSuccess(
            "Vos observations ont bien été enregistrées mises à jour."
          );
          this.updateEtudiantInfos();
        },
        (error) => {
          this.visiteMedicaleSrv.httpSrv.handleError(error);
        }
      );
  }

  viewVisiteMedicale(visiteMedicale: VisiteMedicale) {
    this.router.navigate([
      this.visiteMedicaleSrv.getRoutePrefix(),
      visiteMedicale.id,
    ]);
  }

  editVisiteMedicale(visiteMedicale: VisiteMedicale) {
    this.router.navigate([
      this.visiteMedicaleSrv.getRoutePrefix(),
      visiteMedicale.id,
      "edit",
    ]);
  }

  cloneVisiteMedicale(visiteMedicale: VisiteMedicale) {
    this.router.navigate([
      this.visiteMedicaleSrv.getRoutePrefix(),
      visiteMedicale.id,
      "clone",
    ]);
  }

  deleteVisiteMedicale(visiteMedicale: VisiteMedicale) {
    this.visiteMedicaleSrv.remove(visiteMedicale).subscribe(
      (data) => this.refreshList(),
      (error) => this.visiteMedicaleSrv.httpSrv.handleError(error)
    );
  }

  refreshList() {
    this.visiteMedicaleSrv.findAll().subscribe(
      (data: any) => (this.visiteMedicales = data),
      (error) => this.visiteMedicaleSrv.httpSrv.handleError(error)
    );
  }

  convertSelectedMaladieChroniquesToString() {
    let selectedMaladieString = '';
    this.selectedMaladieChroniques.forEach((selectedmaladieChronique: any) => {
      selectedMaladieString += selectedmaladieChronique.code + ',';
    });
    return selectedMaladieString;
  }

  convertStringToMultiSelectValues(maladieChroniques: string) {
    this.selectedMaladieChroniques = [];
    var selectedMaladies = maladieChroniques.split(",");
    selectedMaladies.forEach((selectedMaladie) => {
      this.selectedMaladieChroniques.push({ code: selectedMaladie, label: selectedMaladie });
    });
  }
}
