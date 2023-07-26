import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

import { TableModule } from 'primeng/table';
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
  PanelModule,
  AutoCompleteModule,
  OverlayPanelModule, DialogModule, SplitButtonModule, InputTextModule, MessagesModule, ListboxModule, ProgressBarModule
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
import {MultiSelectModule} from 'primeng/multiselect';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemeLmdComponent } from './systeme-lmd/systeme-lmd.component';
import { ModalitePaiementComponent } from './modalite-paiement/modalite-paiement.component';
import { DataViewModule } from 'primeng/dataview';
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
import { FormFieldValidationMessageComponent } from './errors/form-field-validation-message/form-field-validation-message.component';
import { DocumentUploadComponent } from './typedocument/document-upload/document-upload.component';
import { ClasseListComponent } from './classe/classe-list/classe-list.component';
import { DossierEtudiantComponent } from './etudiant/dossier-etudiant/dossier-etudiant.component';
import { InscriptionacadListComponent } from './inscriptionacad/inscriptionacad-list/inscriptionacad-list.component';


import { VisiteMedicaleListComponent } from './visite_medical/visite_medicale-list/visite_medicale-list.component';
import { PaymentSuccessComponent } from './inscriptionacad/payment-success/payment-success.component';
import { PaymentFailedComponent } from './inscriptionacad/payment-failed/payment-failed.component';
import { ArticleCloneComponent } from './admin/article/article-clone/article-clone.component';
import { ArticleEditComponent } from './admin/article/article-edit/article-edit.component';
import { ArticleNewComponent } from './admin/article/article-new/article-new.component';
import { ArticleShowComponent } from './admin/article/article-show/article-show.component';
import { ArticleListComponent } from './admin/article/article-list/article-list.component';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ClasseShowComponent } from './classe/classe-show/classe-show.component';
import { EtudiantShowComponent } from './etudiant/etudiant-show/etudiant-show.component';
import { VisiteMedicalDashboardComponent } from './visite_medical/visite-medical-dashboard/visite-medical-dashboard.component';
import { VisiteMedicaleNewComponent } from './visite_medical/visite_medicale-new/visite_medicale-new.component';
import { ArticleItemComponent } from './admin/article/article-item/article-item.component';
import { ArticleItemListComponent } from './admin/article/article-item-list/article-item-list.component';
import { RappelInfoSensibleComponent } from './dashboard/rappel-info-sensible/rappel-info-sensible.component';
import { ServiceElectronicListComponent } from './dashboard/service-electronic-list/service-electronic-list.component';
import { GestionReclamationComponent } from './admin/reclamation-paiement/gestion-reclamation/gestion-reclamation.component';
import { PayantInscriptionacadListComponent } from './inscriptionacad/payant-inscriptionacad-list/payant-inscriptionacad-list.component';
import { PaiementfraisencadrementListComponent } from './paiementfraisencadrement/paiementfraisencadrement-list/paiementfraisencadrement-list.component';
import { VisiteMedicaleStatisticsPageComponent } from './visite_medical/statistique/visite-medicale-statistics-page/visite-medicale-statistics-page.component';
import { VisiteMedicalMonthStatsComponent } from './visite_medical/statistique/visite-medical-month-stats/visite-medical-month-stats.component';
import { VisiteMedicalDoctorsStatsComponent } from './visite_medical/statistique/visite-medical-doctors-stats/visite-medical-doctors-stats.component';
import { VisiteMedicalHandicapStatsComponent } from './visite_medical/statistique/visite-medical-handicap-stats/visite-medical-handicap-stats.component';
import { FraisEncadrementStatusComponent } from './gestion-frais-encadrement/frais-encadrement-status/frais-encadrement-status.component';
import { HistoricPaymentListComponent } from './gestion-frais-encadrement/historic-payment-list/historic-payment-list.component';
import { TemporaryPaymentDetailsComponent } from './gestion-frais-encadrement/temporary-payment-details/temporary-payment-details.component';
import { TemporaryPaymentFormComponent } from './gestion-frais-encadrement/temporary-payment-form/temporary-payment-form.component';
import { FraisEncadrementMainPageComponent } from './gestion-frais-encadrement/frais-encadrement-main-page/frais-encadrement-main-page.component';
import { PaiementTemporaireService } from './gestion-frais-encadrement/services/paiement-temporaire.service';

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
    ReclamationBourseListComponent, ReclamationBourseNewComponent,
    ReclamationBourseShowComponent,
    DemandeDocumentListComponent, DemandeDocumentNewComponent,
    DemandeDocumentShowComponent,
    ContactComponent,
    FormFieldValidationMessageComponent,
    DocumentUploadComponent,
    ClasseListComponent,
    ClasseShowComponent,
    DossierEtudiantComponent,
    InscriptionacadListComponent,
    VisiteMedicaleListComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    ArticleListComponent,
    ArticleCloneComponent,
    ArticleEditComponent,
    ArticleNewComponent,
    ArticleShowComponent,
    EtudiantShowComponent,
    VisiteMedicalDashboardComponent,
    VisiteMedicaleNewComponent,
    ArticleItemComponent,
    ArticleItemListComponent,
    RappelInfoSensibleComponent,
    ServiceElectronicListComponent,
    GestionReclamationComponent,
    PayantInscriptionacadListComponent,
    PaiementfraisencadrementListComponent,
    VisiteMedicaleStatisticsPageComponent,
    VisiteMedicalMonthStatsComponent,
    VisiteMedicalDoctorsStatsComponent,
    VisiteMedicalHandicapStatsComponent,
    FraisEncadrementStatusComponent,
    HistoricPaymentListComponent,
    TemporaryPaymentDetailsComponent,
    TemporaryPaymentFormComponent,
    FraisEncadrementMainPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TableModule,
    ProgressBarModule,
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
    AutoCompleteModule,
    DynamicDialogModule,
    MessagesModule,
    PanelModule,
    InputSwitchModule,
    MultiSelectModule,
    ListboxModule,
    DropdownModule 
  ],
  entryComponents: [
    ReclamationBourseNewComponent
  ],
  providers: [
      CurrencyPipe,
      DatePipe,
      PaiementTemporaireService,
  ]
})
export class PagesModule { }
