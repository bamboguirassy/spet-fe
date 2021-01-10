import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'preinscription-active',
  templateUrl: './preinscription-active.component.html',
  styleUrls: ['./preinscription-active.component.scss']
})
export class PreinscriptionActiveComponent implements OnInit {
  @Input() preinscriptionData: any[];
  @ViewChild('fileUploadModal', { static: false }) fileUploadModalRef: TemplateRef<any>;

  constructor(public httpSrv: HttpService, public router: Router, public modal: NgbModal) { }

  ngOnInit() {
  }

  startProcess(idPreinscription: number) {
    // this.httpSrv.setRetUrl('finaliser-inscription/' + idPreinscription);
    // this.router.navigate(['validator']);
    this.router.navigate(['finaliser-inscription/' + idPreinscription]);
  }



}
