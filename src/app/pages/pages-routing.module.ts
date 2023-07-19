import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';
import { MesInfosComponent } from './mes-infos/mes-infos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemeLmdComponent } from './systeme-lmd/systeme-lmd.component';
import { ModalitePaiementComponent } from './modalite-paiement/modalite-paiement.component';
import { OneEtudiantResolver } from './etudiant/one-etudiant.resolver';
import { CodeResolver } from './code-validator/code.resolver';
import { FinaliserInscriptionComponent } from './inscriptionacad/finaliser-inscription/finaliser-inscription.component';
import { CodeValidatorComponent } from './code-validator/code-validator.component';
import { OnePreinscriptionResolver } from './preinscription/one-preinscription.resolver';
import { BourseComponent } from './bourse/bourse.component';
import { InscriptionPedagogiqueComponent } from './inscription-pedagogique/inscription-pedagogique.component';
import { NoteEvaluationComponent } from './note-evaluation/note-evaluation.component';
import { DossierPedagogiqueComponent } from './dossier-pedagogique/dossier-pedagogique.component';
import { MultipleInscriptionpedagResolver } from './inscriptionpedag/multiple-inscriptionpedag.resolver';
import { MultipleBourseEtudiantResolver } from './bourse/multiple-bourse_etudiant.resolver';
import { UserProfileComponent } from './fos_user/user-profile/user-profile.component';
import { demandeDocumentRoutes } from './demande_document/demande_document.routes';
import { reclamationBourseRoutes } from './bourse/reclamation_bourse/reclamation_bourse.routes';
import { MultipleAssistanceEmailResolver } from './assistanceemail/multiple-assistanceemail.resolver';
import { ContactComponent } from './dashboard/contact/contact.component';
import { MultipleEtudiantResolver } from './etudiant/multiple-etudiant.resolver';
import { classeRoutes } from './classe/classe.routes';
import { visiteMedicaleRoutes } from './visite_medical/visite_medicale.routes';
import { PaymentSuccessComponent } from './inscriptionacad/payment-success/payment-success.component';
import { PaymentFailedComponent } from './inscriptionacad/payment-failed/payment-failed.component';
import { articleRoutes } from './admin/article/article.routes';
import { etudiantRoutes } from './etudiant/etudiant.routes';
import { EtudiantShowComponent } from './etudiant/etudiant-show/etudiant-show.component';
import { OneEtudiantByIdResolver } from './etudiant/one-etudiant-by-id.resolver copy';
import { GestionReclamationComponent } from './admin/reclamation-paiement/gestion-reclamation/gestion-reclamation.component';
import { PayantInscriptionacadListComponent } from './inscriptionacad/payant-inscriptionacad-list/payant-inscriptionacad-list.component';
import {PaiementfraisencadrementListComponent} from './paiementfraisencadrement/paiementfraisencadrement-list/paiementfraisencadrement-list.component';
import {FraisEncadrementStatusComponent} from './gestion-frais-encadrement/frais-encadrement-status/frais-encadrement-status.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '', component: DashboardComponent, pathMatch: 'full',
        resolve: { etudiant: OneEtudiantResolver /*, assistants: MultipleAssistanceEmailResolver*/}
      },
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      {
        path: 'validator', component: CodeValidatorComponent,
        data: { breadcrumb: 'Confirmation d\'identité' }, resolve: { code: CodeResolver }
      },
      { path: 'systeme-lmd', component: SystemeLmdComponent, data: { breadcrumb: 'Le système LMD' } },
      {
        path: 'modalite-paiement', component: ModalitePaiementComponent,
        data: { breadcrumb: 'Les modalités de paiement' }
      },
      {path:'status', component:FraisEncadrementStatusComponent},
      {
        path: 'espace-paiement',
        data: { breadcrumb: 'Espace paiement' },
        children:[
          {
            path: '',
            component: PayantInscriptionacadListComponent,
            data: { breadcrumb: 'Inscriptions académiques' }
          },
          {
            path: ':idInscriptionacad/:typeEvent/:refCommand', component: PaiementfraisencadrementListComponent,
            data: { breadcrumb: 'Paiements' }
          },
          {
            path: ':idInscriptionacad', component: PaiementfraisencadrementListComponent,
            data: { breadcrumb: 'Paiements' }
          },
        ]
      },
      {
        path: 'mes-infos', component: MesInfosComponent,
        data: { breadcrumb: 'Mon compte' }
      },
      {
        path: 'bourse', component: BourseComponent,
        data: { breadcrumb: 'Etat des bourses' },
        resolve: {bourseData: MultipleBourseEtudiantResolver}
      },
      {
        path: 'dossier-pedagogique', component: DossierPedagogiqueComponent,
        data: { breadcrumb: 'Mon dossier pédagogique' }
      },
      {
        path: 'inscription-pedagogique/:id', component: InscriptionPedagogiqueComponent,
        data: {
          breadcrumb: 'Mes inscriptions pédagogiques',
        },
        resolve: { inscriptionpedagData: MultipleInscriptionpedagResolver }
      },
      {
        path: 'note-evaluation/:id', component: NoteEvaluationComponent,
        data: { breadcrumb: 'Mes notes' }
      },
      articleRoutes,
      // {
      //   path: 'mon-parcours', component: MonParcoursComponent,
      //   data: { breadcrumb: 'Mon parcours' },
      //   resolve: {
      //     inscriptions: MultipleInscriptionacadResolver,
      //     preinscriptions: MultiplePreinscriptionResolver,
      //     typedocuments: MultipleTypedocumentResolver,
      //     etats: MultipleEtatDemandeDocumentResolver
      //   }
      // },
      {
        path: 'profile', component: UserProfileComponent,
        data: { breadcrumb: 'Mon Profile' },
        resolve: {
          etudiant: OneEtudiantResolver,
        }
      },
      {
        path: 'finaliser-inscription/:id', component: FinaliserInscriptionComponent,
        data: { breadcrumb: 'Finaliser mon inscription' }, resolve: { preinscription: OnePreinscriptionResolver }
      },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
      { path: 'reclamation-paiement', component: GestionReclamationComponent, data: { breadcrumb: 'Réclamation Paiement' } },
      {
        path: 'contact', component: ContactComponent,
        resolve: {
          assistants: MultipleAssistanceEmailResolver,
        }
      },
      {
        path: 'etudiant/:id', component: EtudiantShowComponent, resolve: { etudiant: OneEtudiantByIdResolver }
      },
      {
        path: 'payment-succeeded', component: PaymentSuccessComponent,
        data: { breadcrumb: 'Paiement en cours de vérification' },
        resolve: { etudiant: OneEtudiantResolver}
      },
      {
        path: 'payment-failed', component: PaymentFailedComponent,
        data: { breadcrumb: 'Erreur Paiement' },
        resolve: { etudiant: OneEtudiantResolver}
      },
      demandeDocumentRoutes,
      reclamationBourseRoutes,
      classeRoutes,
      visiteMedicaleRoutes,

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
