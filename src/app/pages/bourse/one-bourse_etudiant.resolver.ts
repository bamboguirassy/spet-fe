import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BourseEtudiantService } from './bourse_etudiant.service';

@Injectable({
  providedIn: 'root'
})
export class OneBourseEtudiantResolver implements Resolve<any> {
  resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot) {
    return this.bourseEtudiantSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ bourseEtudiant: null, error: message });
    }));
  }

  constructor(public bourseEtudiantSrv: BourseEtudiantService) { }
}

