
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Etudiant } from '../../etudiant/etudiant';
import { InscriptionTemporaire } from './inscription_temporaire';

@Injectable({
  providedIn: 'root'
})
export class InscriptionTemporaireService {

  private routePrefix = 'inscriptiontemporaire';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findWithPreinscriptionByNumDossier(numdossier) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'preinscription/'+numdossier);
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(inscription_temporaire: InscriptionTemporaire) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', inscription_temporaire);
  }

  update(inscription_temporaire: InscriptionTemporaire) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + inscription_temporaire.id + '/edit', inscription_temporaire);
  }

  clone(original: InscriptionTemporaire, clone: InscriptionTemporaire) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(inscription_temporaire: InscriptionTemporaire) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + inscription_temporaire.id);
  }

  removeSelection(inscription_temporaires: InscriptionTemporaire[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', inscription_temporaires);
  }

  findEncoursByEtudiant(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'en-cours/etudiant/' + etudiant.id);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  getInscriptionTempPreinscription(id) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'preinscription/' + id);
  }

}
