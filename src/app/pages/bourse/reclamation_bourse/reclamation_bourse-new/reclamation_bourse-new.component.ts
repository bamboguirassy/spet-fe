
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ReclamationBourse } from '../reclamation_bourse';
import { ReclamationBourseService } from '../reclamation_bourse.service';
import { BourseEtudiant } from '../../bourse_etudiant';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-reclamationbourse-new',
  templateUrl: './reclamation_bourse-new.component.html',
  styleUrls: ['./reclamation_bourse-new.component.scss']
})
export class ReclamationBourseNewComponent implements OnInit {
  reclamationBourse: ReclamationBourse;
  bourseEtudiant: BourseEtudiant;

  constructor(public reclamationBourseSrv: ReclamationBourseService,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.reclamationBourse = new ReclamationBourse();
  }

  ngOnInit() {
    this.bourseEtudiant = this.config.data.bourseEtudiant;
  }

  saveReclamationBourse() {
    if (this.bourseEtudiant) {
      this.reclamationBourse.bourseEtudiant = this.bourseEtudiant.id;
    }
    this.reclamationBourseSrv.create(this.reclamationBourse)
      .subscribe((data: any) => {
        this.ref.close(data);
        this.reclamationBourseSrv.httpSrv.notificationSrv.showInfo('ReclamationBourse créé avec succès');
        this.reclamationBourseSrv.httpSrv.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), data.id]);
        this.reclamationBourse = new ReclamationBourse();
      }, error => {
        this.reclamationBourseSrv.httpSrv.handleError(error);
      });
  }
  public closeModal() {
    this.ref.close('Cross click');
  }



}



