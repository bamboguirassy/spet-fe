import { Component, OnInit, Input } from '@angular/core';
import { VisiteMedicaleService } from '../../visite_medicale.service';
import { Anneeacad } from 'src/app/pages/anneeacad/anneeacad';

@Component({
  selector: 'app-visite-medical-doctors-stats',
  templateUrl: './visite-medical-doctors-stats.component.html',
  styleUrls: ['./visite-medical-doctors-stats.component.scss']
})
export class VisiteMedicalDoctorsStatsComponent implements OnInit {
  @Input()
  anneeacad: Anneeacad;
  statsData = [];
  totalVisits:number = 0;

  constructor(public visiteMedicaleSrv: VisiteMedicaleService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.visiteMedicaleSrv.findDoctorStatsByAnneeacad(this.anneeacad.id)
    .subscribe((data: any)=>{      
      this.totalVisits = data.reduce((acc: any,current: any)=>acc+parseInt(current.visitsCount),0);
      this.statsData = data.map((doctorItem: any)=>{
        let percent = doctorItem.visitsCount*100/this.totalVisits;
        // arrondir à 2 chiffres après la virgule
        percent = Math.round(percent * 100) / 100;
        doctorItem.percent = percent;
        return doctorItem;
      });
    });
  }

}
