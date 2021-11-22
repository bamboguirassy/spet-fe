import { Injectable } from '@angular/core';
import {HttpService} from '../../shared/services/http.service';
import {Classe} from '../classe/classe';
import {Etudiant} from '../etudiant/etudiant';
import {Inscriptionacad} from '../inscriptionacad/inscriptionacad';
import {InscriptionTemporaire} from '../inscriptionacad/inscription_temporaire/inscription_temporaire';

@Injectable({
  providedIn: 'root'
})
export class PaiementfraisencadrementService {

  private routePrefix: string = 'paiementfraisencadrement';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findAllByInscriptionacadId(inscriptionacadId: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash()+'inscriptionacad/'+inscriptionacadId);
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(inscriptionacad: Inscriptionacad) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', inscriptionacad);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }
}
