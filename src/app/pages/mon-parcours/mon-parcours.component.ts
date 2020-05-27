import {Component, OnInit} from '@angular/core';
import {Inscriptionacad} from '../inscriptionacad/inscriptionacad';
import {InscriptionacadService} from '../inscriptionacad/inscriptionacad.service';
import {ActivatedRoute} from '@angular/router';
import {Preinscription} from '../preinscription/preinscription';
import {DemandeDocument} from '../demande_document/demande_document';
import {Typedocument} from '../typedocument/typedocument';
import {EtatDemandeDocument} from '../demande_document/etat_demande_document/etat_demande_document';
import {DemandeDocumentService} from '../demande_document/demande_document.service';

@Component({
    selector: 'app-mon-parcours',
    templateUrl: './mon-parcours.component.html',
    styleUrls: ['./mon-parcours.component.scss']
})
export class MonParcoursComponent implements OnInit {
    public type = 'grid';
    public searchText: string;
    inscriptions: Inscriptionacad[] = [];
    preinscriptions: Preinscription[] = [];

    /** @var dd Object d'une demande de document */
    dd = new DemandeDocument();
    display = false;
    typedocuments: Typedocument[];
    etats: EtatDemandeDocument[];


    constructor(
        public inscriptionAcadSrv: InscriptionacadService,
        public activatedRoute: ActivatedRoute, public demandeDocumentSrv: DemandeDocumentService) {
    }

    ngOnInit() {
        this.inscriptions = this.activatedRoute.snapshot.data.inscriptions;
        this.preinscriptions = this.activatedRoute.snapshot.data.preinscriptions;
        this.typedocuments = this.activatedRoute.snapshot.data.typedocuments;
        this.etats = this.activatedRoute.snapshot.data.etats;
    }

    showDialog() {
        this.display = true;
    }

    sendAdministratifDocRequest(inscriptionacad: Inscriptionacad) {
        this.dd.etat_actuel = this.etats[0].id; // En Attente d'Approbation
        this.dd.inscriptionacad = inscriptionacad.id;
        this.demandeDocumentSrv.create(this.dd).subscribe(
            dd => this.demandeDocumentSrv.httpSrv.notificationSrv.showSuccess('Demande envoyée avec succès'),
            error => console.log(error)
        );
    }

}
