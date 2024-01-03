import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GfcWebServiceService {
  private prefix = 'https://gfc.uidt.sn/api';
  // private prefix = 'http://127.0.0.1:8000/api';


  constructor(private http: HttpClient) { }

  private getDefaultHeaders(token?: string): HttpHeaders {
    let defaultHeaders = new HttpHeaders();

    if (token) {
      defaultHeaders = defaultHeaders.set('Authorization', 'gpe ' + token);
    }

    return defaultHeaders;
  }

  private handleError(error: HttpErrorResponse) {
    // Votre gestion des erreurs ici
    console.error('Une erreur est survenue : ', error);
    return throwError(error);
  }

  private checkForTokenError(): (source: Observable<any>) => Observable<any> {
    return (source: Observable<any>): Observable<any> => {
      return source.pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && ['JWT Token not found', 'Invalid JWT Token'].includes(error.error && error.error.message)) {
            // Le token GPE est expiré ou invalide
            // Vous pouvez ajouter ici le code pour déconnecter l'utilisateur si nécessaire
            throw new Error('Votre session a expiré. Veuillez vous reconnecter.');
          }
          return throwError(error);
        })
      );
    };
  }

  public get(endpoint: string, token?: string): Observable<any> {
    const headers = this.getDefaultHeaders(token);
    return this.http.get<any>(`${this.prefix}${endpoint}`, { headers }).pipe(
      this.checkForTokenError(),
      catchError(this.handleError)
    );
  }

  public post(endpoint: string, data: any, token?: string): Observable<any> {
    const headers = this.getDefaultHeaders(token);
    return this.http.post<any>(`${this.prefix}${endpoint}`, data, { headers }).pipe(
      this.checkForTokenError(),
      catchError(this.handleError)
    );
  }

  public put(endpoint: string, data: any, token?: string): Observable<any> {
    const headers = this.getDefaultHeaders(token);
    return this.http.put<any>(`${this.prefix}${endpoint}`, data, { headers }).pipe(
      this.checkForTokenError(),
      catchError(this.handleError)
    );
  }

  public delete(endpoint: string, data: any, token?: string): Observable<any> {
    const headers = this.getDefaultHeaders(token);
    const options = { headers, body: data };
    return this.http.delete<any>(`${this.prefix}${endpoint}`, options).pipe(
      this.checkForTokenError(),
      catchError(this.handleError)
    );
  }
}
