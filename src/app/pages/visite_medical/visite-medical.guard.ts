import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FosUser } from '../fos_user/fos_user';

@Injectable({
  providedIn: 'root'
})
export class VisiteMedicalGuard implements CanActivate {
  currentUser: FosUser;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.currentUser.idgroup && !['SA', 'MEDECIN','MedChef'].includes(this.currentUser.idgroup.codegroupe)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  constructor(public authSrv: AuthService, public router: Router) {
    this
      .authSrv
      .currentUserProvider
      .subscribe((user: any) => {
        this.currentUser = user;
      }, error => {
        this
          .authSrv
          .httpSrv
          .handleError(error);
      });
  }

}
