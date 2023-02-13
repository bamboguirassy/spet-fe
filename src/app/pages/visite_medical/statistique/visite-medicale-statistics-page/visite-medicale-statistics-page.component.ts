import { Component, OnInit } from '@angular/core';
import { AnneeacadService } from '../../../anneeacad/anneeacad.service';
import { first } from 'rxjs/operators';
import { Anneeacad } from 'src/app/pages/anneeacad/anneeacad';

@Component({
  selector: 'app-visite-medicale-statistics-page',
  templateUrl: './visite-medicale-statistics-page.component.html',
  styleUrls: ['./visite-medicale-statistics-page.component.scss']
})
export class VisiteMedicaleStatisticsPageComponent implements OnInit {
  anneeEnCours: Anneeacad;

  constructor(public anneeacadSrv: AnneeacadService) { }

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

}
