import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssistanceEmailService } from './assistanceemail.service';

@Injectable({
  providedIn: 'root'
})
export class OneAssistanceEmailResolver implements Resolve<any> {
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.assistanceEmailSrv.findOneById(route.params.id).pipe(map(data => {
      return data;
    }),
    catchError(error => {
      const message = `Retrieval error: ${error}`;
      return of({ assistanceEmail: null, error: message });
    }));
  }

  constructor(public assistanceEmailSrv:AssistanceEmailService) { }
}

