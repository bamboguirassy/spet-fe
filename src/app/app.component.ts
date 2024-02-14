import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { PwaService } from './shared/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public settings: Settings;

  ngOnInit(): void {
  }

  constructor(public appSettings: AppSettings,
              public pwa: PwaService) {
    this.settings = this.appSettings.settings;
  }

  // installPwa(): void {
  //   this.pwa.promptEvent.prompt();
  // }
}
