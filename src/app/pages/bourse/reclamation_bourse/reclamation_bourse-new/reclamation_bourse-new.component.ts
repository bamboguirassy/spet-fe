
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReclamationBourse } from '../reclamation_bourse';
import { ReclamationBourseService } from '../reclamation_bourse.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BourseEtudiant } from '../../bourse_etudiant';
import { NgbModal } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { BourseEtudiantService } from '../../bourse_etudiant.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-reclamation_bourse-new',
  templateUrl: './reclamation_bourse-new.component.html',
  styleUrls: ['./reclamation_bourse-new.component.scss']
})
export class ReclamationBourseNewComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  reclamationBourse: ReclamationBourse;
  // tslint:disable-next-line:variable-name
  reclamationBourses: ReclamationBourse ;
  bourses: BourseEtudiant[] = [];
  @Output() created: EventEmitter<ReclamationBourse> = new EventEmitter();

  constructor(public reclamationBourseSrv: ReclamationBourseService,
              public bourseEtudiantSrv: BourseEtudiantService,

              public notificationSrv: NotificationService, public router: Router, public location: Location, public modalSercive: NgbModal,
              public activatedRoute: ActivatedRoute,
             ) {
                this.reclamationBourse = new ReclamationBourse();
  }

  ngOnInit() {
    this.bourses = this.activatedRoute.snapshot.data.bourses;
    this.reclamationBourses = this.activatedRoute.snapshot.data.reclamationBourses;
  }

  saveReclamationBourse() {
    this.reclamationBourseSrv.create(this.reclamationBourse)
      .subscribe((data: any) => {
        this.created.emit(data);
        this.closeModal();
        this.notificationSrv.showInfo('ReclamationBourse créé avec succès');
        this.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), data.id]);
        this.reclamationBourse = new ReclamationBourse();
      }, error => this.reclamationBourseSrv.httpSrv.handleError(error)
    );
  }

  saveReclamationBourseAndExit() {
    this.reclamationBourseSrv.create(this.reclamationBourse)
      .subscribe((data: any) => {
        this.created.emit(data);
        this.closeModal();
        this.router.navigate([this.reclamationBourseSrv.getRoutePrefix(), data.id]);
        this.reclamationBourse = new ReclamationBourse();
      }, error => this.reclamationBourseSrv.httpSrv.handleError(error));
  }



public closeModal() {
  this.modalSercive.dismissAll('Cross click');
}



}



