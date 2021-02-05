import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { VisiteMedicaleService } from './visite_medicale.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisiteMedicalWithInscriptionacadResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): any | import("rxjs").Observable<any> | Promise<any> {
    return this.visiteMedicaleSrv.findWithAtLeastOneInsacad().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.visiteMedicaleSrv.httpSrv.handleError(error);
        return of({ visiteMedicales: null, error: message });
      }));
  }

  constructor(public visiteMedicaleSrv: VisiteMedicaleService) { }
}

