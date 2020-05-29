import {Component, OnInit} from '@angular/core';
import {DemandeDocument} from '../demande_document';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandeDocumentService} from '../demande_document.service';
import {Location} from '@angular/common';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {HistoriqueEtatDemandeService} from '../historique_etat_demande/historique_etat_demande.service';
import {HistoriqueEtatDemande} from '../historique_etat_demande/historique_etat_demande';

@Component({
    selector: 'app-demande_document-show',
    templateUrl: './demande_document-show.component.html',
    styleUrls: ['./demande_document-show.component.scss']
})
export class DemandeDocumentShowComponent implements OnInit {

    demande_document: DemandeDocument;
    historiqueEtats: HistoriqueEtatDemande[] = [];
    colors: string[] = [];

    constructor(
        public activatedRoute: ActivatedRoute, public historiqueEtatSvr: HistoriqueEtatDemandeService,
        public demande_documentSrv: DemandeDocumentService, public location: Location,
        public router: Router, public notificationSrv: NotificationService) {
    }

    ngOnInit() {
        this.demande_document = this.activatedRoute.snapshot.data.demande_document;
        this.findHistoriqueEtatDemande(this.demande_document);
    }

    findHistoriqueEtatDemande(demande: DemandeDocument) {
        this.historiqueEtatSvr.findByDemande(demande).subscribe(
            (historiqueEtats: any) => {
                this.historiqueEtats = historiqueEtats.reverse();
                for (let i = 1; i < this.historiqueEtats.length; i++) {
                    this.colors.push(this.historiqueEtats[i].etat.codeCouleur); // ajoute la couleur de l'état précéent
                }
            },
            error => this.demande_documentSrv.httpSrv.handleError(error)
        );
    }

    removeDemandeDocument() {
        this.demande_documentSrv.remove(this.demande_document)
            .subscribe(data => this.router.navigate([this.demande_documentSrv.getRoutePrefix()]),
                error => this.demande_documentSrv.httpSrv.handleError(error));
    }

    refresh() {
        this.demande_documentSrv.findOneById(this.demande_document.id)
            .subscribe((data: any) => this.demande_document = data,
                error => this.demande_documentSrv.httpSrv.handleError(error));
    }
}

