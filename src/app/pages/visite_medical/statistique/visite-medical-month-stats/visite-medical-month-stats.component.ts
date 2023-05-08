import { Component, Input, OnInit } from '@angular/core';
import { VisiteMedicaleService } from '../../visite_medicale.service';
import { Anneeacad } from '../../../anneeacad/anneeacad';

@Component({
  selector: 'app-visite-medical-month-stats',
  templateUrl: './visite-medical-month-stats.component.html',
  styleUrls: ['./visite-medical-month-stats.component.scss']
})
export class VisiteMedicalMonthStatsComponent implements OnInit {

  @Input()
  anneeacad: Anneeacad;
  monthData = [];
  totalVisits:number = 0;

  constructor(public visiteMedicaleSrv: VisiteMedicaleService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.visiteMedicaleSrv.findMonthStatsByAnneeacad(this.anneeacad.id)
    .subscribe((data: any)=>{
      this.totalVisits = data.reduce((acc: any,current: any)=>acc+parseInt(current.visitsCount),0);
      this.monthData = data.map((monthItem: any)=>{
        let percent = monthItem.visitsCount*100/this.totalVisits;
        // arrondir à 2 chiffres après la virgule
        percent = Math.round(percent * 100) / 100;
        monthItem.percent = percent;
        return monthItem;
      });
    });
  }

}
