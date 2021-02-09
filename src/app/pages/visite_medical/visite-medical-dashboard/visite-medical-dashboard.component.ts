import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { Anneeacad } from "../../anneeacad/anneeacad";
import { AnneeacadService } from "../../anneeacad/anneeacad.service";
import { VisiteMedicale } from "../visite_medicale";
import { VisiteMedicaleService } from "../visite_medicale.service";

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
    public authSrv: AuthService,
    public visiteMedicalSrv: VisiteMedicaleService
  ) {}

  ngOnInit() {
    this.visiteMedicales = this.activatedRoute.snapshot.data["visiteMedicales"];
    this.findAnneeEnCours();
  }
  refreshList() {
    this.visiteMedicalSrv.findAll().subscribe(
      (data: any) => (this.visiteMedicales = data),
      (error) => this.visiteMedicalSrv.httpSrv.handleError(error)
    );
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
