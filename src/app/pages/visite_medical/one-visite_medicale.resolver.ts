import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { VisiteMedicaleService } from './visite_medicale.service';

@Injectable({
  providedIn: 'root'
})
export class OneVisiteMedicaleResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.visiteMedicaleSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ visiteMedicale: null, error: message });
    }));
  }

  constructor(public visiteMedicaleSrv:VisiteMedicaleService) { }
}

