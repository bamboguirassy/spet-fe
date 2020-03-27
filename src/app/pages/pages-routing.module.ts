import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';
import { MesInfosComponent } from './mes-infos/mes-infos.component';
import { MonParcoursComponent } from './mon-parcours/mon-parcours.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParcoursDetailsComponent } from './mon-parcours/parcours-details/parcours-details.component';
import { SystemeLmdComponent } from './systeme-lmd/systeme-lmd.component';
import { ModalitePaiementComponent } from './modalite-paiement/modalite-paiement.component';
import { OneEtudiantResolver } from './etudiant/one-etudiant.resolver';
import { MultipleInscriptionacadResolver } from './inscriptionacad/multiple-inscriptionacad.resolver';
import { CodeResolver } from './code-validator/code.resolver';
import { FinaliserInscriptionComponent } from './inscriptionacad/finaliser-inscription/finaliser-inscription.component';
import { CodeValidatorComponent } from './code-validator/code-validator.component';
import { MultiplePreinscriptionResolver } from './preinscription/multiple-preinscription.resolver';
import { OnePreinscriptionResolver } from './preinscription/one-preinscription.resolver';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'validator', component: CodeValidatorComponent,
       data: { breadcrumb: 'Confirmation d\'identité' }, resolve: {code: CodeResolver} },
      { path: 'systeme-lmd', component: SystemeLmdComponent, data: { breadcrumb: 'Le système LMD' } },
      { path: 'modalite-paiement', component: ModalitePaiementComponent,
       data: { breadcrumb: 'Les modalités de paiement' } },
      { path: 'mes-infos', component: MesInfosComponent,
       data: { breadcrumb: 'Mon compte' }, resolve: { etudiant: OneEtudiantResolver } },
      { path: 'mon-parcours', component: MonParcoursComponent,
       data: { breadcrumb: 'Mon parcours' },
        resolve: { inscriptions: MultipleInscriptionacadResolver,
          preinscriptions: MultiplePreinscriptionResolver } },
      { path: 'parcours/:id', component: ParcoursDetailsComponent,
       data: { breadcrumb: 'Détails du parcours' } },
      { path: 'finaliser-inscription/:id', component: FinaliserInscriptionComponent,
       data: { breadcrumb: 'Finaliser mon inscription' }, resolve: {preinscription: OnePreinscriptionResolver} },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
