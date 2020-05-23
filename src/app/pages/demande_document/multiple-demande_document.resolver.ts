import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DemandeDocumentService } from './demande_document.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultipleDemandeDocumentResolver implements Resolve<any> {
  resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): any | import('rxjs').Observable<any> | Promise<any> {
    return this.demande_documentSrv.findMesDemandes().pipe(map(data => {
      return data;
    }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        this.demande_documentSrv.httpSrv.handleError(error);
        return of({ demande_documents: null, error: message });
      }));
  }

  constructor(public demande_documentSrv: DemandeDocumentService) { }
}

