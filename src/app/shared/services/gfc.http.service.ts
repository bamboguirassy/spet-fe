import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from './token-manager.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GFCHttpService {

  url: string;
  httpOptions: any = null;
  user: any;
  customUrl: string;

  constructor(private httpSrv: HttpClient,
    public tokenManager: TokenManagerService,
    public notificationSrv: NotificationService,
    public router: Router) {
    this.customUrl = 'https://gfc.uidt.sn/api/';
  }

  createAuthorizationHeader(): any {
    const headers = new HttpHeaders({
      Accept: 'application/json',
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

}
