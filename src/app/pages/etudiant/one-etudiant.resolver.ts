import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EtudiantService } from './etudiant.service';

@Injectable({
  providedIn: 'root'
})
export class OneEtudiantResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.etudiantSrv.findMonCompteEtudiant().pipe(map(data => {
      return data;
    }),
    catchError(error => {
      this.etudiantSrv.httpSrv.handleError(error);
      const message = `Retrieval error: ${error}`;
      return of({ etudiant: null, error: message });
    }));
  }

  constructor(public etudiantSrv:EtudiantService) { }
}

