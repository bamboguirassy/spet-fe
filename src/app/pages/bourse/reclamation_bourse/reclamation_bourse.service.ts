
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ReclamationBourse } from './reclamation_bourse';

@Injectable({
  providedIn: 'root'
})
export class ReclamationBourseService {

  private routePrefix = 'reclamationbourse';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  findMesReclamations() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'mes-reclamations/');
  }

  create(reclamationBourse: ReclamationBourse) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', reclamationBourse);
  }

  update(reclamationBourse: ReclamationBourse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + reclamationBourse.id + '/edit', reclamationBourse);
  }

  clone(original: ReclamationBourse, clone: ReclamationBourse) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(reclamationBourse: ReclamationBourse) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + reclamationBourse.id);
  }

  removeSelection(reclamationBourses: ReclamationBourse[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', reclamationBourses);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

}
