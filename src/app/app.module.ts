import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { routing } from './app.routing';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AuthService } from './shared/services/auth.service';
import { HttpService } from './shared/services/http.service';

registerLocaleData(localeFr, 'fr');

export function currentUserProviderFactory(authSrv: AuthService) {
  return () => authSrv.getCurrentUser();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PerfectScrollbarModule,
    routing,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgbModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
    ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
    AppSettings,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: currentUserProviderFactory, deps: [AuthService], multi: true
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    MessageService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
