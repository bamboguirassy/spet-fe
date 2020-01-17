import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FosUser } from '../fos_user/fos_user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent  {

  constructor(){}
   
}
