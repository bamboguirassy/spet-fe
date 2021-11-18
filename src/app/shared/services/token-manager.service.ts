import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  token: string;
  private tokenName: string = 'gpe';
  public localStorage = window.localStorage;

  constructor() { }

  getToken() {
    if (!this.token) {
      this.token = this.localStorage.getItem(this.tokenName);
    }
    return this.token ? this.token : null;
  }

  public getTokenName(): string {
    return this.tokenName;
  }

  public setToken(token: string) {
    this.localStorage.setItem(this.tokenName,token);
    this.token = token;
  }
}
