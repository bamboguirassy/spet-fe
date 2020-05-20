import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BourseEtudiantService } from './bourse_etudiant.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleBourseEtudiantResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.bourse_etudiantSrv.findAll().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.bourse_etudiantSrv.httpSrv.handleError(error);
        return of({ bourse_etudiants: null, error: message });
      }));
  }

  constructor(public bourse_etudiantSrv: BourseEtudiantService) { }
}

