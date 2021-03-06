import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReclamationBourseService } from './reclamation_bourse.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleReclamationBourseResolver implements Resolve<any> {
  resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): any | import('rxjs').Observable<any> | Promise<any> {
    return this.reclamationBourseSrv.findMesReclamations().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.reclamationBourseSrv.httpSrv.handleError(error);
        return of({ reclamationBourses: null, error: message });
      }));
  }

  constructor(public reclamationBourseSrv: ReclamationBourseService) { }
}

