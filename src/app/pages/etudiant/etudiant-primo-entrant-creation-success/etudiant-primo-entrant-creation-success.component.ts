import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../etudiant';
import { EtudiantService } from '../etudiant.service';

@Component({
  selector: 'app-etudiant-primo-entrant-creation-success',
  templateUrl: './etudiant-primo-entrant-creation-success.component.html',
  styleUrls: ['./etudiant-primo-entrant-creation-success.component.scss']
})
export class EtudiantPrimoEntrantCreationSuccessComponent implements OnInit,AfterViewInit {
  etudiant: Etudiant;
  constructor(public etudiantSrv: EtudiantService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEtudiantGeneratedFields();
  }

  ngAfterViewInit(): void {
    document.getElementById('preloader').classList.add('hide');
  }

  getEtudiantGeneratedFields() {
    this.etudiantSrv.getGeneratedFields(this.activatedRoute.snapshot.params.id)
      .subscribe((data: any) => {
        this.etudiant = data;
      }, err => this.etudiantSrv.httpSrv.handleError(err));
  }

}
