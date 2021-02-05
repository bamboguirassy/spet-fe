import { Route } from "@angular/router";
import { MultipleVisiteMedicaleResolver } from './multiple-visite_medicale.resolver';
import { VisiteMedicalDashboardComponent } from './visite-medical-dashboard/visite-medical-dashboard.component';
import { VisiteMedicalGuard } from './visite-medical.guard';
import { VisiteMedicaleListComponent } from './visite_medicale-list/visite_medicale-list.component';
import { VisiteMedicalWithInscriptionacadResolver } from './visite_medical_with_inscription.resolver';

const visiteMedicaleRoutes: Route = {
    path: 'visite-medicale', children: [
        {
            path: '',
            component: VisiteMedicalDashboardComponent,
            canActivate: [VisiteMedicalGuard],
            resolve: { visiteMedicales: VisiteMedicalWithInscriptionacadResolver }
        },
    ]
};

export { visiteMedicaleRoutes }
