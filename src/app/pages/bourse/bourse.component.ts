import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ReclamationBourseNewComponent } from './reclamation_bourse/reclamation_bourse-new/reclamation_bourse-new.component';
import { BourseEtudiant } from './bourse_etudiant';
import { BourseEtudiantService } from './bourse_etudiant.service';
import { ReclamationBourseService } from './reclamation_bourse/reclamation_bourse.service';
import { ReclamationBourse } from './reclamation_bourse/reclamation_bourse';

@Component({
  selector: 'app-bourse',
  templateUrl: './bourse.component.html',
  styleUrls: ['./bourse.component.scss']
})
export class BourseComponent implements OnInit {
  bourseData: any;
  seletecbourse: BourseEtudiant;
  reclamationBourses = [];



  constructor(private activatedRoute: ActivatedRoute,
              public modalSrv: NgbModal, public BourseSvr: BourseEtudiantService,
              public reclamationBourseSrv: ReclamationBourseService,
  ) { }

  ngOnInit() {
    this.bourseData = this.activatedRoute.snapshot.data.bourseData;
    this.reclamationBourses = this.activatedRoute.snapshot.data.reclamationBourses;
  }
  toggleAddModal(bourseData) {
    this.seletecbourse = bourseData;
    const modalRef = this.modalSrv.open(ReclamationBourseNewComponent, {
      size: 'lg',
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
    console.log(this.seletecbourse);
    modalRef.componentInstance.seletecbourse = this.seletecbourse;

    modalRef.componentInstance.created
      .subscribe((reclamationBourse: ReclamationBourse) => {
        this.reclamationBourses.push(reclamationBourse);
        this.reclamationBourses = [...this.reclamationBourses];
      });
    console.log(this.reclamationBourses);
  }
}

