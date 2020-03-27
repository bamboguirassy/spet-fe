
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { FosUser } from './fos_user';

@Injectable({
  providedIn: 'root'
})
export class FosUserService {

  private routePrefix: string = 'fos_user';

  constructor(public httpSrv: HttpService) { }

  findAll() {
    return this.httpSrv.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: number) {
    return this.httpSrv.get(this.getRoutePrefixWithSlash() + id);
  }

  create(fosuser: FosUser) {
    return this.httpSrv.post(this.getRoutePrefixWithSlash() + 'create', fosuser);
  }

  registerEtudiant(accountData: any) {
    return this.httpSrv.post('public/register-etudiant', accountData);
  }

  emailChange(recoveryMailData: any) {
    return this.httpSrv.post('public/change-mail', recoveryMailData);
  }

  update(fosuser: FosUser) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+fosuser.id+'/edit', fosuser);
  }

  clone(original: FosUser, clone: FosUser) {
    return this.httpSrv.put(this.getRoutePrefixWithSlash()+original.id+'/clone', clone);
  }

  remove(fos_user: FosUser) {
    return this.httpSrv.delete(this.getRoutePrefixWithSlash()+fos_user.id);
  }

  removeSelection(fos_users: FosUser[]) {
    return this.httpSrv.deleteMultiple(this.getRoutePrefixWithSlash()+'delete-selection/',fos_users);
  }

  public getRoutePrefix(): string {
    return this.routePrefix;
  }

  private getRoutePrefixWithSlash(): string {
    return this.routePrefix+'/';
  }

}
