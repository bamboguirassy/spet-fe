
import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts/release/utils';
import { HttpService } from 'src/app/shared/services/http.service';
import { Anneeacad } from '../anneeacad/anneeacad';
import { Classe } from './classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private routePrefix: string = 'classe';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(classe: Classe) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', classe);
  }

  update(classe: Classe) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+classe.id+'/edit', classe);
  }

  clone(original: Classe, clone: Classe) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(classe: Classe) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+classe.id);
  }

  removeSelection(classes: Classe[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',classes);
  }

  findEntite(){
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+ 'etablissement/');
  }
  
  findClasseByEntiteGroupByAnnee(anneeacad: Anneeacad){
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'entite/')
  }


  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
