import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CodeResolver implements Resolve<Number> {
    constructor(public httpSrv: HttpService) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        if (!this.httpSrv.getRetUrl()) {
            this.httpSrv.router.navigate(['']);
        }
        return this.httpSrv.get('auth/security-code/').pipe(map(data => {
            return data;
        }),
            catchError(error => {
                console.log(error);
                const message = `Retrieval error: ${error}`;
                return of({ etudiant: null, error: message });
            }));
    }
}