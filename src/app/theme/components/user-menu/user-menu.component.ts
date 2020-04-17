import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FosUser } from 'src/app/pages/fos_user/fos_user';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  currentUser: FosUser;

  constructor(public authSrv: AuthService) { }

  ngOnInit() {
    this.authSrv.currentUserProvider.subscribe(data => this.currentUser = data,
      error => {});
    this.authSrv.getCurrentUser();
  }

  logout() {
    this.authSrv.logout();
  }

}
