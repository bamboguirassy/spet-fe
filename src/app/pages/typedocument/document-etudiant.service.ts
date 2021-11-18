import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Etudiant } from '../etudiant/etudiant';
import { DocumentEtudiant } from './documentetudiant';

@Injectable({
  providedIn: 'root'
})
export class DocumentEtudiantService {

  private routePrefix = 'document-etudiant';

  constructor(public httpSrv: HttpService) { }


  create(documentEtudiant: DocumentEtudiant) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + `create`, documentEtudiant);
  }

  updateOther(documentEtudiant: DocumentEtudiant) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+documentEtudiant.id+'/edit-other', documentEtudiant);
  }

  remove(documentEtudiant: DocumentEtudiant) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash() + documentEtudiant.id);
  }

  findByEtudiant(etudiant: Etudiant) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + 'etudiant/' + etudiant.id)
  }

  
  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }
}
