import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pays } from '../../pays/pays';
import { PaysService } from '../../pays/pays.service';
import { Preinscription } from '../../preinscription/preinscription';
import { Etudiant } from '../etudiant';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-request-etudiant-creation',
  templateUrl: './request-etudiant-creation.component.html',
  styleUrls: ['./request-etudiant-creation.component.scss']
})
export class RequestEtudiantCreationComponent implements AfterViewInit {

  preinscription: Preinscription;
  etudiant: Etudiant;
  index: number = 0;
  selectedRegion: any;

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

  sexes = [
    { value: 'M', label: 'Masculin' },
    { value: 'F', label: 'Feminin' }
  ];

  serieBacs = [
    { value: 'S1', label: 'Série S1' },
    { value: 'S2', label: 'Série S2' },
    { value: 'S3', label: 'Série S3' },
    { value: 'S4', label: 'Série S4' },
    { value: 'S5', label: 'Série S5' },
    { value: 'L1', label: 'Série L1' },
    { value: 'L2', label: 'Série L2' },
    { value: 'L', label: "Série L'" },
    { value: 'T1', label: 'Série T' },
    { value: 'T2', label: 'Série T' },
    { value: 'G', label: 'Série G' },
    { value: 'S1A', label: 'Série S1A' },
    { value: 'S2A', label: 'Série S2A' },
    { value: 'LA', label: "Série L'A" },
    { value: 'L1a', label: 'Série L1a' },
    { value: 'L2b', label: 'Série L2b' },
    { value: 'STEG', label: 'Série STEG' }
  ];

  mentionbacs = [
    { value: 'Passable', label: 'Passable' },
    { value: 'Assez Bien', label: 'Assez Bien' },
    { value: 'Bien', label: 'Bien' },
    { value: 'Tres Bien', label: 'Tres Bien' }
  ];

  groupepassages = [
    { value: 'Groupe 1', label: 'Groupe 1' },
    { value: 'Groupe 2', label: 'Groupe 2' }
  ];

  pays: Pays[] = [];


  constructor(public activatedRoute: ActivatedRoute,
    public paysSrv: PaysService,
    public etudiantSrv: EtudiantService) {
    this.preinscription = activatedRoute.snapshot.data.preinscription;
    this.etudiant = new Etudiant();
    this.etudiant.cni = this.preinscription.cni;
    this.etudiant.datenaiss = this.preinscription.datenaiss;
    this.etudiant.email = this.preinscription.email;
    this.etudiant.ine = this.preinscription.ine;
    this.etudiant.lieunaiss = this.preinscription.lieunaiss;
    this.etudiant.nationalite = this.preinscription.nationalite;
    this.etudiant.nometudiant = this.preinscription.nometudiant;
    this.etudiant.prenometudiant = this.preinscription.prenometudiant;
    this.etudiant.teletudiant = this.preinscription.tel;
    this.etudiant.nationalite = this.preinscription.nationalite.id;
    this.etudiant.notifmail = false;
    this.etudiant.handicap = 'Non';
    this.etudiant.orphelin = 'Non';
  }

  ngAfterViewInit(): void {
    document.getElementById('preloader').classList.add('hide');
  }

  ngOnInit() {
    this.getPays();
  }

  getPays() {
    this.paysSrv.findAll()
      .subscribe((data: any) => {
        this.pays = data;
        let senegal = this.pays.find((pay) => pay.alpha2 == 'SN');
        this.pays = [senegal, ...this.pays];
      }, err => this.paysSrv.httpSrv.handleError(err));
  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  createPrimoEntrant() {
    this.etudiantSrv.createPrimoEntrant(this.etudiant)
      .subscribe((data: any) => {
        this.etudiantSrv.httpSrv.router.navigate(['register','primo-success-etudiant',data.id]);
      }, err => this.etudiantSrv.httpSrv.handleError(err));
  }


}
