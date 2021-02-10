import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { Anneeacad } from "../../anneeacad/anneeacad";
import { AnneeacadService } from "../../anneeacad/anneeacad.service";
import { VisiteMedicale } from "../visite_medicale";

@Component({
  selector: "app-visite-medical-dashboard",
  templateUrl: "./visite-medical-dashboard.component.html",
  styleUrls: ["./visite-medical-dashboard.component.scss"],
})
export class VisiteMedicalDashboardComponent implements OnInit {
  anneeEnCours: Anneeacad;
  visiteMedicales: VisiteMedicale[] = [];
  constructor(
    public anneeacadSrv: AnneeacadService,
    public activatedRoute: ActivatedRoute,
    public authSrv: AuthService
  ) {}

  ngOnInit() {
    this.visiteMedicales = this.activatedRoute.snapshot.data["visiteMedicales"];
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

  onCreate(visiteMedicale: VisiteMedicale) {
    this.visiteMedicales.push(visiteMedicale);
  }
}
