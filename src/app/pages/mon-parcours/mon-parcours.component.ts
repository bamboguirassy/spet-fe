import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Inscriptionacad } from '../inscriptionacad/inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad/inscriptionacad.service';
import { ActivatedRoute } from '@angular/router';
import { Preinscription } from '../preinscription/preinscription';
import { DemandeDocument } from '../demande_document/demande_document';
import { Typedocument } from '../typedocument/typedocument';
import { EtatDemandeDocument } from '../demande_document/etat_demande_document/etat_demande_document';
import { DemandeDocumentService } from '../demande_document/demande_document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-mon-parcours',
    templateUrl: './mon-parcours.component.html',
    styleUrls: ['./mon-parcours.component.scss']
})
export class MonParcoursComponent implements OnInit {
    public type = 'grid';
    public searchText: string;
    inscriptions: Inscriptionacad[] = [];
    preinscriptionData: any[] = [];

    /** @var dd Object d'une demande de document */
    dd = new DemandeDocument();
    requestDocAdmin = false;
    typedocuments: Typedocument[];
    etats: EtatDemandeDocument[];
    source = '';
    display = false;
    inscriptionacad: Inscriptionacad;
    @ViewChild('fileUploadModal', { static: false }) fileUploadModalRef: TemplateRef<any>;

    constructor(
        public inscriptionAcadSrv: InscriptionacadService, public modal: NgbModal,
        public activatedRoute: ActivatedRoute, public demandeDocumentSrv: DemandeDocumentService) {
    }

    ngOnInit() {
        this.inscriptions = this.activatedRoute.snapshot.data.inscriptions;
        this.preinscriptionData = this.activatedRoute.snapshot.data.preinscriptions;
        this.typedocuments = this.activatedRoute.snapshot.data.typedocuments;
        this.etats = this.activatedRoute.snapshot.data.etats;
    }

    showDocAdminRequestDialog(inscriptionacad: Inscriptionacad) {
        this.inscriptionacad = inscriptionacad;
        this.requestDocAdmin = true;
        this.display = true;
        this.source = 'administrative';
    }

    showDocPedagRequestDialog(inscriptionacad: Inscriptionacad) {
        this.inscriptionacad = inscriptionacad;
        this.requestDocAdmin = false;
        this.display = true;
        this.source = 'pedagogique';
    }

    requestDocument() {
        this.dd.etatActuel = this.etats[0].id; // En Attente d'Approbation -> default
        this.dd.inscriptionacad = this.inscriptionacad.id;
        this.demandeDocumentSrv.create(this.dd).subscribe(
            () => {
                this.demandeDocumentSrv.httpSrv.notificationSrv.showSuccess('Demande envoyée avec succès');
                this.dd = new DemandeDocument();
                this.display = false;
            },
            error => this.demandeDocumentSrv.httpSrv.handleError(error)
        );
    }

    displayDocumentModal() {
        this.modal.open(this.fileUploadModalRef, {
            size: 'lg',
            centered: true,
            keyboard: false,
            backdrop: 'static'
        });
    }

    dismissModal() {
        this.modal.dismissAll('Cross click');
    }
}
