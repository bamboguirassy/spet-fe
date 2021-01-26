import { Route } from "@angular/router";
import { InscriptionacadListComponent } from "../inscriptionacad/inscriptionacad-list/inscriptionacad-list.component";
import { MultipleInscriptionacadResolver } from "../inscriptionacad/multiple-inscriptionacad.resolver";
import { ClasseListComponent } from './classe-list/classe-list.component';
import { ClasseShowComponent } from "./classe-show/classe-show.component";
import { MultipleClasseResolver } from './multiple-classe.resolver';
import { OneClasseResolver } from './one-classe.resolver';

const classeRoutes: Route = {
    path: 'classe', children: [
        { path: '', component: ClasseListComponent,/* resolve: { classes: MultipleClasseResolver }*/ },
        // { path: 'new', component: ClasseNewComponent },
        // { path: ':id/edit', component: ClasseEditComponent, resolve: { classe: OneClasseResolver } },
        // { path: 'inscriptionacad/:id', component: InscriptionacadListComponent, resolve:{inscriptions: MultipleInscriptionacadResolver} },
        { path: ':id', component: ClasseShowComponent, resolve: { classe: OneClasseResolver } }
    ]

};

export { classeRoutes }
