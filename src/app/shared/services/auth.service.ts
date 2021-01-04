import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { FosUser } from 'src/app/pages/fos_user/fos_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //current user
  private currentUserManager: BehaviorSubject<any> = new BehaviorSubject([]);
  public currentUserProvider = this.currentUserManager.asObservable();
  currentUser: FosUser;

  public localStorage = window.localStorage;

  constructor(public httpSrv: HttpService) { }

  getCurrentUser() {
    let req = this.httpSrv.get('auth/current_user/');
    req.subscribe((data: any) => {
      this.currentUserManager.next(data);
      this.currentUser = data;
      if (!['ADMIN', 'ETU', 'DSOS'].includes(this.currentUser.profession.codeprofil)) {
       this.httpSrv.notificationSrv.showError("Vous n'êtes pas autorisé à vous connecter à cette application");
        this.logout();
      }
    },
      error => {});
    return req;
  }

  login(loginInformation: any) {
    return this.httpSrv.post('login_check', loginInformation);
  }

  logout() {
    this.httpSrv.tokenManager.setToken('');
    this.localStorage.removeItem(this.httpSrv.tokenManager.getTokenName());
    this.httpSrv.router.navigate(['login']);
  }

  confirmRegistration(id: number) {
    return this.httpSrv.get('public/registration-confirmation/' + id);
  }

  getRoles(): string[] {
    let roles: string[] = [];
    if (this.currentUser) {
      roles = this.currentUser.idgroup.roles;
    }
    return roles;
  }

  checkCloneAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_CLONE';
    return this.getRoles().includes(role);
  }

  checkEditAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_EDITION';
    return this.getRoles().includes(role);
  }

  checkCreateAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_NOUVEAU';
    return this.getRoles().includes(role);
  }

  checkDeleteAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_DELETE';
    return this.getRoles().includes(role);
  }

  checkListAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_LISTE';
    return this.getRoles().includes(role);
  }

  checkShowAccess(entityName: string) {
    let role = 'ROLE_' + entityName.toUpperCase() + '_AFFICHAGE';
    return this.getRoles().includes(role);
  }


}
