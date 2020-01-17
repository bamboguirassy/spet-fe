import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  public settings: Settings;

  private currentYear:number;
  constructor(public appSettings:AppSettings) {
      this.settings = this.appSettings.settings;
      this.currentYear=new Date().getFullYear();
  }

  ngOnInit() {
  }

}
