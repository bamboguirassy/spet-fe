import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HistoriqueEtatReclamationService } from './historique_etat_reclamation.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleHistoriqueEtatReclamationResolver implements Resolve<any> {
  resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): any | import('rxjs').Observable<any> | Promise<any> {
    return this.historiqueEtatReclamationSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.historiqueEtatReclamationSrv.httpSrv.handleError(error);
        return of({ historique_etat_reclamations: null, error: message });
      }));
  }

  constructor(public historiqueEtatReclamationSrv: HistoriqueEtatReclamationService) { }
}

