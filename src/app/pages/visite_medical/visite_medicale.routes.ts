import { Route } from "@angular/router";
import { VisiteMedicalGuard } from './visite-medical.guard';
import { VisiteMedicaleListComponent } from './visite_medicale-list/visite_medicale-list.component';

const visiteMedicaleRoutes: Route = {
    path: 'visite-medicale', children: [
        { path: '', component: VisiteMedicaleListComponent, canActivate: [VisiteMedicalGuard] },
    ]
};

export { visiteMedicaleRoutes }
