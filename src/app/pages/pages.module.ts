import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

import {TableModule} from 'primeng/table';
import { ContextMenuModule, MenuModule, ButtonModule, CardModule, FieldsetModule, ToolbarModule, TabViewModule, DropdownModule, SelectButtonModule, SpinnerModule, EditorModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { HorizontalMenuComponent } from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { MesInfosComponent } from './mes-infos/mes-infos.component';
import { MonParcoursComponent } from './mon-parcours/mon-parcours.component';
import { ParcoursItemComponent } from './mon-parcours/parcours-item/parcours-item.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { StatistiqueInscriptionComponent } from './statistique-inscription/statistique-inscription.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParcoursDetailsComponent } from './mon-parcours/parcours-details/parcours-details.component';
import { StatistiqueParcoursComponent } from './mon-parcours/statistique-parcours/statistique-parcours.component';
import { SystemeLmdComponent } from './systeme-lmd/systeme-lmd.component';
import { ModalitePaiementComponent } from './modalite-paiement/modalite-paiement.component';
import {DataViewModule} from 'primeng/dataview';
import { PreinscriptionActiveComponent } from './preinscription/preinscription-active/preinscription-active.component';
import { CodeValidatorComponent } from './code-validator/code-validator.component';
import { FinaliserInscriptionComponent } from './inscriptionacad/finaliser-inscription/finaliser-inscription.component';
import { UpdatePersoInfoComponent } from './inscriptionacad/update-perso-info/update-perso-info.component';
import { InfosInscriptionComponent } from './inscriptionacad/infos-inscription/infos-inscription.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UpdatePhotoComponent } from './inscriptionacad/update-photo/update-photo.component';



@NgModule({
  declarations: [
    PagesComponent,
    BlankComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    BackTopComponent,
    UserMenuComponent,
    MesInfosComponent,
    MonParcoursComponent,
    ParcoursItemComponent,
    StatistiqueInscriptionComponent,
    DashboardComponent,
    ParcoursDetailsComponent,
    StatistiqueParcoursComponent,
    SystemeLmdComponent,
    ModalitePaiementComponent,
    PreinscriptionActiveComponent,
    CodeValidatorComponent,
    FinaliserInscriptionComponent,
    UpdatePersoInfoComponent,
    InfosInscriptionComponent,
    UpdatePhotoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TableModule,
    ContextMenuModule,
    MenuModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    ToolbarModule,
    TabViewModule,
    SharedModule,
    FilterPipeModule,
    NgxChartsModule,
    DataViewModule,
    ImageCropperModule,
    DropdownModule,
    SelectButtonModule,
    SpinnerModule,
    EditorModule
  ]
})
export class PagesModule { }
