import { Route } from '@angular/router';
import { ReclamationBourseListComponent } from './reclamation_bourse-list/reclamation_bourse-list.component';
import { ReclamationBourseNewComponent } from './reclamation_bourse-new/reclamation_bourse-new.component';
import { ReclamationBourseShowComponent } from './reclamation_bourse-show/reclamation_bourse-show.component';
import { MultipleReclamationBourseResolver } from './multiple-reclamation_bourse.resolver';
import { OneReclamationBourseResolver } from './one-reclamation_bourse.resolver';

const reclamationBourseRoutes: Route = {
    path: 'reclamationbourse', children: [
        { path: '', component: ReclamationBourseListComponent, resolve: { reclamation_bourses: MultipleReclamationBourseResolver } },
        { path: 'new', component: ReclamationBourseNewComponent },
        { path: ':id', component: ReclamationBourseShowComponent, resolve: { reclamation_bourse: OneReclamationBourseResolver } }
    ]

};

export { reclamationBourseRoutes };
