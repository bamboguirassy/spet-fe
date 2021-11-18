import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ReclamationBourseNewComponent } from './reclamation_bourse/reclamation_bourse-new/reclamation_bourse-new.component';
import { BourseEtudiant } from './bourse_etudiant';
import { BourseEtudiantService } from './bourse_etudiant.service';
import { ReclamationBourseService } from './reclamation_bourse/reclamation_bourse.service';
import { ReclamationBourse } from './reclamation_bourse/reclamation_bourse';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-bourse',
  templateUrl: './bourse.component.html',
  styleUrls: ['./bourse.component.scss'],
  providers: [DialogService]
})
export class BourseComponent implements OnInit {
  bourseData: any;
  seletectedbourse: BourseEtudiant;
  reclamationBourses = [];



  constructor(private activatedRoute: ActivatedRoute,
    public modalSrv: DialogService, public BourseSvr: BourseEtudiantService,
    public reclamationBourseSrv: ReclamationBourseService,
  ) { }

  ngOnInit() {
    this.bourseData = this.activatedRoute.snapshot.data.bourseData;
    this.reclamationBourses = this.activatedRoute.snapshot.data.reclamationBourses;
  }

  toggleNewReclamationModal(selectedBourseEtudiant) {
    this.modalSrv.open(ReclamationBourseNewComponent, {
      data: {
        bourseEtudiant: selectedBourseEtudiant
      },
      width: '70%',
      header: 'Nouvelle réclamation'
    });
  }
}

