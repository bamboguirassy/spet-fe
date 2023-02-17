
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { VisiteMedicale } from './visite_medicale';

@Injectable({
  providedIn: 'root'
})
export class VisiteMedicaleService {

  private routePrefix = 'visitemedicale';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  findWithAtLeastOneInsacad() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'with-inscriptionacad');
  }

  findMonthStatsByAnneeacad(anneeId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'monthstats-anneeacad/'+anneeId);
  }

  findDoctorStatsByAnneeacad(anneeId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'doctor-stats-annee/'+anneeId);
  }

  findHandicapStatsByAnneeacad(anneeId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'handicap-stats-annee/'+anneeId);
  }

  create(visite_medicale: VisiteMedicale) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', visite_medicale);
  }

  update(visite_medicale: VisiteMedicale) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+visite_medicale.id+'/edit', visite_medicale);
  }

  clone(original: VisiteMedicale, clone: VisiteMedicale) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(visite_medicale: VisiteMedicale) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+visite_medicale.id);
  }

  removeSelection(visite_medicales: VisiteMedicale[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',visite_medicales);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
