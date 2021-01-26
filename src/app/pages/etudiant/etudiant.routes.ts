import { Route } from "@angular/router";
import { EtudiantShowComponent } from "./etudiant-show/etudiant-show.component";
import { OneEtudiantResolver } from "./one-etudiant.resolver";

const etudiantRoutes: Route = {
    path: 'etudiant', children: [
        { path: ':id', component: EtudiantShowComponent, resolve: { etudiant: OneEtudiantResolver } }
    ]

};

export { etudiantRoutes }
