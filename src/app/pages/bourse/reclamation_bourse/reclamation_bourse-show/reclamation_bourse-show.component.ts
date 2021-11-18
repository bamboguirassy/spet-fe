import { Component, OnInit } from '@angular/core';
import { ReclamationBourse } from '../reclamation_bourse';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationBourseService } from '../reclamation_bourse.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { HistoriqueEtatReclamation } from '../../historique_etat_reclamation/historique_etat_reclamation';
import { HistoriqueEtatReclamationService } from '../../historique_etat_reclamation/historique_etat_reclamation.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-reclamation_bourse-show',
  templateUrl: './reclamation_bourse-show.component.html',
  styleUrls: ['./reclamation_bourse-show.component.scss']
})
export class ReclamationBourseShowComponent implements OnInit {

  reclamationBourse: ReclamationBourse;
  historiqueEtats: HistoriqueEtatReclamation[] = [];
  colors: string[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public reclamationBourseSrv: ReclamationBourseService, public location: Location,
              public router: Router, public notificationSrv: NotificationService,
              public historiqueEtatReclamationSrv: HistoriqueEtatReclamationService) {
  }

  ngOnInit() {
    this.reclamationBourse = this.activatedRoute.snapshot.data.reclamationBourse;
    this.findHistoriqueEtatReclamation(this.reclamationBourse);
  }
  findHistoriqueEtatReclamation(reclamation: ReclamationBourse) {
    this.historiqueEtatReclamationSrv.findByReclamation(reclamation).subscribe(
      (historiqueEtats: any) => {
                   this.historiqueEtats = historiqueEtats.reverse(); // recupérer les états par le plus récent
                   for (let i = 1; i < this.historiqueEtats.length; i++) { // débuter par le premier état précédent
                       this.colors.push(this.historiqueEtats[i].etat.codeCouleur); // ajouter la couleur de chaque état précédent
                  }
              },
             error => this.reclamationBourseSrv.httpSrv.handleError(error)
           );
}

  removeReclamationBourse() {
    this.reclamationBourseSrv.remove(this.reclamationBourse)
      .subscribe(data => this.router.navigate([this.reclamationBourseSrv.getRoutePrefix()]),
        error =>  this.reclamationBourseSrv.httpSrv.handleError(error));
  }

  refresh() {
    this.reclamationBourseSrv.findOneById(this.reclamationBourse.id)
    .subscribe((data: any) => this.reclamationBourse = data,
      error => this.reclamationBourseSrv.httpSrv.handleError(error));
  }

}

