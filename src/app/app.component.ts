import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.authSrv.getCurrentUser();
  }
  public settings: Settings;
  constructor(public appSettings: AppSettings,
    public authSrv: AuthService) {
    this.settings = this.appSettings.settings;
  }
}
