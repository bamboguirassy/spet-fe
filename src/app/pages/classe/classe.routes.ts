import { Route } from "@angular/router";
import { ClasseListComponent } from './classe-list/classe-list.component';
import { MultipleClasseResolver } from './multiple-classe.resolver';
import { OneClasseResolver } from './one-classe.resolver';

const classeRoutes: Route = {
    path: 'classe', children: [
        { path: '', component: ClasseListComponent, resolve: { classes: MultipleClasseResolver } },
        // { path: 'new', component: ClasseNewComponent },
        // { path: ':id/edit', component: ClasseEditComponent, resolve: { classe: OneClasseResolver } },
        // { path: ':id/clone', component: ClasseCloneComponent, resolve: { classe: OneClasseResolver } },
        // { path: ':id', component: ClasseShowComponent, resolve: { classe: OneClasseResolver } }
    ]

};

export { classeRoutes }
