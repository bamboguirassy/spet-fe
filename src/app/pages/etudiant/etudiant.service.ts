
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Etudiant } from './etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private routePrefix: string = 'etudiant';
  public routerPrefixPreinscription: string = 'preinscription';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  uploadPhoto(etudiant: Etudiant, photoData) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'upload-photo/'+etudiant.id, photoData);
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  getGeneratedFields(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'public/' + id + '/show-generated-fields');
  }

  findByCni(cni: any) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'cni/' + cni);
  }

  getSituationMatrimonialeValues() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'situation-matrimoniale/');
  }

  getHandicapValues() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'handicap/');
  }

  getOrphelinValues() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'orphelin/');
  }

  getTypeHandicapValues() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'type-handicap/');
  }

  findMonCompteEtudiant() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'mon-compte/');
  }

  create(etudiant: Etudiant) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', etudiant);
  }

  createPrimoEntrant(etudiant: Etudiant) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'public/create-primoentrant/', etudiant);
  }

  update(etudiant: Etudiant) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + etudiant.id + '/edit', etudiant);
  }

  autoUpdate(etudiant: Etudiant) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + 'update-infos/', etudiant);
  }
  findUserByEmail(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'find-by-email/'+ etudiant.emailUniv);
  }

  clone(original: Etudiant, clone: Etudiant) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash() + original.id + '/clone', clone);
  }

  remove(etudiant: Etudiant) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + etudiant.id);
  }

  removeSelection(etudiants: Etudiant[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash() + 'delete-selection/', etudiants);
  }
  sendEmail(etudiant: Etudiant){
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'send-by-email/'+ etudiant.id);

  }

  findByNuminterne(numinterne: any) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'public/numinterne/' + numinterne);
  }

  searchByNumInterne(numeroInterne: any) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'search/' + numeroInterne);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix + '/';
  }

  public verifierInscriptionEtudiantActif(cni: any){
    return this.httpSrv.get(this.routerPrefixPreinscription + '/public/verifier-inscription-etudiant-active/' + cni);
  }

}
