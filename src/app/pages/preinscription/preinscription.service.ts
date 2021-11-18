
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Etudiant } from '../etudiant/etudiant';
import { Preinscription } from './preinscription';

@Injectable({
  providedIn: 'root'
})
export class PreinscriptionService {

  private routePrefix: string = 'preinscription';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  requestNewEtudiantCreation(cni: string) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'public/request-etudiant-creation/' + cni);
  }

  findActivePreinscriptionByEtudiant(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'active/'+etudiant.id+'/etudiant');
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'public/' + id);
  }

  create(preinscription: Preinscription) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', preinscription);
  }

  update(preinscription: Preinscription) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + preinscription.id + '/edit', preinscription);
  }

  clone(original: Preinscription, clone: Preinscription) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(preinscription: Preinscription) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + preinscription.id);
  }

  removeSelection(preinscriptions: Preinscription[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', preinscriptions);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

}
