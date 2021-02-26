
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Classe } from '../classe/classe';
import { Etudiant } from '../etudiant/etudiant';
import { Inscriptionacad } from './inscriptionacad';
import { InscriptionTemporaire } from './inscription_temporaire/inscription_temporaire';

@Injectable({
  providedIn: 'root'
})
export class InscriptionacadService {

  private routePrefix: string = 'inscriptionacad';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  getInscriptionacadByPreinscription(id) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'preinscription/'+id);
  }

  findByClasse(classe: Classe) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'classe/'+classe.id);
  }

  getInscriptionsEtudiant(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'inscriptions/'+etudiant.id+'/etudiant');
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(inscriptionacad: Inscriptionacad) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', inscriptionacad);
  }

  update(inscriptionacad: Inscriptionacad) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+inscriptionacad.id+'/edit', inscriptionacad);
  }

  confirmPrepaidInscription(inscriptionTemporaire: InscriptionTemporaire) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+inscriptionTemporaire.id+'/confirm-prepaid-inscription', inscriptionTemporaire);
  }

  clone(original: Inscriptionacad, clone: Inscriptionacad) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(inscriptionacad: Inscriptionacad) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+inscriptionacad.id);
  }

  removeSelection(inscriptionacads: Inscriptionacad[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',inscriptionacads);
  }

  findEncoursByEtudiant(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'en-cours/etudiant/' + etudiant.id);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
