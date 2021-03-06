import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionTemporaireService } from './inscription_temporaire.service';

@Injectable({
  providedIn: 'root'
})
export class OneInscriptionTemporaireResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.inscriptionTemporaireSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ inscriptionTemporaire: null, error: message });
    }));
  }

  constructor(public inscriptionTemporaireSrv:InscriptionTemporaireService) { }
}

