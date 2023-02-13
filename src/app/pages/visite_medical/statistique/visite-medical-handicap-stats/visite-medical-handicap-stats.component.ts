import { Component, OnInit, Input } from '@angular/core';
import { Anneeacad } from 'src/app/pages/anneeacad/anneeacad';
import { VisiteMedicaleService } from '../../visite_medicale.service';

@Component({
  selector: 'app-visite-medical-handicap-stats',
  templateUrl: './visite-medical-handicap-stats.component.html',
  styleUrls: ['./visite-medical-handicap-stats.component.scss']
})
export class VisiteMedicalHandicapStatsComponent implements OnInit {

  @Input()
  anneeacad: Anneeacad;
  statsData = [];
  totalVisits:number = 0;

  constructor(public visiteMedicaleSrv: VisiteMedicaleService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.visiteMedicaleSrv.findHandicapStatsByAnneeacad(this.anneeacad.id)
    .subscribe((data: any)=>{      
      this.totalVisits = data.reduce((acc: any,current: any)=>acc+parseInt(current.visitsCount),0);
      this.statsData = data.map((doctorItem: any)=>{
        let percent = doctorItem.visitsCount*100/this.totalVisits;
        doctorItem.percent = percent;
        return doctorItem;
      });
    });
  }

}
