import { Route } from "@angular/router";
import { DemandeDocumentListComponent } from './demande_document-list/demande_document-list.component';
import { DemandeDocumentNewComponent } from './demande_document-new/demande_document-new.component';
import { DemandeDocumentShowComponent } from './demande_document-show/demande_document-show.component';
import { MultipleDemandeDocumentResolver } from './multiple-demande_document.resolver';
import { OneDemandeDocumentResolver } from './one-demande_document.resolver';

const demandeDocumentRoutes: Route = {
    path: 'demandedocument', children: [
        { path: '', component: DemandeDocumentListComponent, resolve: { demande_documents: MultipleDemandeDocumentResolver } },
        { path: 'new', component: DemandeDocumentNewComponent },
        { path: ':id', component: DemandeDocumentShowComponent, resolve: { demande_document: OneDemandeDocumentResolver } }
    ]

};

export { demandeDocumentRoutes }
