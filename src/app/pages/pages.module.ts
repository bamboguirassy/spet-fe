import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

import {TableModule} from 'primeng/table';
import {
    ContextMenuModule,
    MenuModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    ToolbarModule,
    TabViewModule,
    DropdownModule,
    SelectButtonModule,
    SpinnerModule,
    EditorModule,
    InputMaskModule,
    AccordionModule,
    OverlayPanelModule, DialogModule, SplitButtonModule, InputTextModule
} from 'primeng/primeng';
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
import { FilterPipeModule } from 'ngx-filter-pipe';
import { StatistiqueInscriptionComponent } from './statistique-inscription/statistique-inscription.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { BourseComponent } from './bourse/bourse.component';
import { InscriptionPedagogiqueComponent } from './inscription-pedagogique/inscription-pedagogique.component';
import { NoteEvaluationComponent } from './note-evaluation/note-evaluation.component';
import { DossierPedagogiqueComponent } from './dossier-pedagogique/dossier-pedagogique.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './fos_user/user-profile/user-profile.component';
import { DemandeDocumentListComponent } from './demande_document/demande_document-list/demande_document-list.component';
import { ReclamationBourseListComponent } from './bourse/reclamation_bourse/reclamation_bourse-list/reclamation_bourse-list.component';
import { ReclamationBourseNewComponent } from './bourse/reclamation_bourse/reclamation_bourse-new/reclamation_bourse-new.component';
import { ReclamationBourseShowComponent } from './bourse/reclamation_bourse/reclamation_bourse-show/reclamation_bourse-show.component';
import { DemandeDocumentShowComponent } from './demande_document/demande_document-show/demande_document-show.component';
import { DemandeDocumentNewComponent } from './demande_document/demande_document-new/demande_document-new.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';



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
    StatistiqueInscriptionComponent,
    DashboardComponent,
    SystemeLmdComponent,
    ModalitePaiementComponent,
    PreinscriptionActiveComponent,
    CodeValidatorComponent,
    FinaliserInscriptionComponent,
    UpdatePersoInfoComponent,
    InfosInscriptionComponent,
    UpdatePhotoComponent,
    BourseComponent,
    InscriptionPedagogiqueComponent,
    NoteEvaluationComponent,
    DossierPedagogiqueComponent,
    UserProfileComponent,
    ReclamationBourseListComponent, ReclamationBourseNewComponent, ReclamationBourseShowComponent,
    DemandeDocumentListComponent, DemandeDocumentNewComponent, DemandeDocumentShowComponent, ContactComponent
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
        EditorModule,
        InputMaskModule,
        NgbModule,
        AccordionModule,
        OverlayPanelModule,
        DialogModule,
        SplitButtonModule,
        InputTextModule,
        DynamicDialogModule
    ],
    entryComponents: [
      ReclamationBourseNewComponent
    ]
})
export class PagesModule { }
