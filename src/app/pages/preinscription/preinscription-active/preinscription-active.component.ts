import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'preinscription-active',
  templateUrl: './preinscription-active.component.html',
  styleUrls: ['./preinscription-active.component.scss']
})
export class PreinscriptionActiveComponent implements OnInit {
  @Input() preinscriptionData: any[];

  constructor(public httpSrv: HttpService, public router: Router) { }

  ngOnInit() {
  }

  startProcess(idPreinscription: number) {
    // this.httpSrv.setRetUrl('finaliser-inscription/' + idPreinscription);
    // this.router.navigate(['validator']);
    this.router.navigate(['finaliser-inscription/' + idPreinscription]);
  }

}
