import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from './token-manager.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string;
  httpOptions: any = null;
  user: any;
  customUrl: string;
  pdfUrl: string;
  private retUrl = '';
  urlValidEmail: string;
  // private clientUrl = 'http://localhost:4200/';
  private clientUrl = 'https://etudiant.univ-thies.sn/#/';

  constructor(private httpSrv: HttpClient,
    public tokenManager: TokenManagerService,
    public notificationSrv: NotificationService,
    public router: Router) {
    // this.customUrl = 'http://127.0.0.1:8000/api/';
    //this.urlValidEmail = 'https://api.emailverifyapi.com/v3/lookups/json?key=5BA3C4B98EAE2C68&email=';
    this.customUrl = 'https://gpe-ws.univ-thies.sn/api/';
  }

  createAuthorizationHeaderWithProgress(): any {
    if (!this.httpOptions) {
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.tokenManager.getTokenName() + ' ' + this.tokenManager.getToken(),
        }),
        reportProgress: true,
        observe: 'events'
      };
    }

    return this.httpOptions;
  }

  createAuthorizationHeader(): any {
    const headers = new HttpHeaders({
      Authorization: this.tokenManager.getTokenName() + ' ' + this.tokenManager.getToken()
    });
    this.httpOptions = {
      headers
    };
    return this.httpOptions;
  }

  get(url: string) {
    return this.httpSrv.get(this.customUrl + url, this.createAuthorizationHeader()).pipe(first());
  }

  post(url: string, data: any) {
    return this.httpSrv.post(this.customUrl + url, data, this.createAuthorizationHeader()).pipe(first());
  }

  put(url: string, data: any) {
    return this.httpSrv.put(this.customUrl + url, data, this.createAuthorizationHeader()).pipe(first());
  }

  deleteMultiple(url: string, data: any) {
    return this.httpSrv.post(this.customUrl + url, data, this.createAuthorizationHeader()).pipe(first());
  }

  delete(url: string) {
    return this.httpSrv.delete(this.customUrl + url, this.createAuthorizationHeader()).pipe(first());
  }

  handleError(error: any) {
    this.notificationSrv.showError(error.error.message);
    if (error.error.code == 401) {
      this.router.navigate(['login']);
    }
  }

  setRetUrl(url: string) {
    this.retUrl = url;
  }

  getRetUrl() {
    return this.retUrl;
  }

  getClientUrl() {
    return this.clientUrl;
  }

  /* verifierEmailEtudiant(email: string){
     return this.httpSrv.get(this.urlValidEmail+email)
     .pipe(first());
   }*/

}
