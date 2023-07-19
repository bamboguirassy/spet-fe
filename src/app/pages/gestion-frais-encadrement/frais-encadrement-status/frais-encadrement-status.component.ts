import { Component, OnInit } from '@angular/core';
import { FraisEncadrementStatusService } from 'src/app/pages/gestion-frais-encadrement/frais-encadrement-status.service';

@Component({
  selector: 'app-frais-encadrement-status',
  templateUrl: './frais-encadrement-status.component.html',
  styleUrls: ['./frais-encadrement-status.component.scss']
})
export class FraisEncadrementStatusComponent implements OnInit {

  data: any[] = [];

  constructor(private statusService: FraisEncadrementStatusService) {}
  
  ngOnInit() {
    this.data = this.statusService.getFraisEncadrementStatus();
  }

}
