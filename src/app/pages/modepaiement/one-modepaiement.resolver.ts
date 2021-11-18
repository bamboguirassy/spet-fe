import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModepaiementService } from './modepaiement.service';

@Injectable({
  providedIn: 'root'
})
export class OneModepaiementResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.modepaiementSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ modepaiement: null, error: message });
    }));
  }

  constructor(public modepaiementSrv:ModepaiementService) { }
}

