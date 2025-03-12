import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Inscriptionacad } from '../inscriptionacad/inscriptionacad';
import { InscriptionacadService } from '../inscriptionacad/inscriptionacad.service';
import { ActivatedRoute } from '@angular/router';
import { Preinscription } from '../preinscription/preinscription';
import { DemandeDocument } from '../demande_document/demande_document';
import { Typedocument } from '../typedocument/typedocument';
import { EtatDemandeDocument } from '../demande_document/etat_demande_document/etat_demande_document';
import { DemandeDocumentService } from '../demande_document/demande_document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypedocumentService } from '../typedocument/typedocument.service';
import { EtatDemandeDocumentService } from '../demande_document/etat_demande_document/etat_demande_document.service';
import { Etudiant } from '../etudiant/etudiant';
import { PreinscriptionService } from '../preinscription/preinscription.service';

@Component({
    selector: 'app-mon-parcours',
    templateUrl: './mon-parcours.component.html',
    styleUrls: ['./mon-parcours.component.scss']
})
export class MonParcoursComponent implements OnInit {

    @Input() etudiant: Etudiant;

    public type = 'grid';
    public searchText: string;
    inscriptions: Inscriptionacad[] = [];

    /** @var dd Object d'une demande de document */
    dd = new DemandeDocument();
    requestDocAdmin = false;
    typedocuments: Typedocument[] = [];
    etats: EtatDemandeDocument[] = [];
    source = '';
    display = false;
    inscriptionacad: Inscriptionacad;
    @ViewChild('fileUploadModal', { static: false }) fileUploadModalRef: TemplateRef<any>;
    @Output() parcoursLoaded: EventEmitter<any> = new EventEmitter();


    constructor(
        public inscriptionAcadSrv: InscriptionacadService,
        public modal: NgbModal,
        public activatedRoute: ActivatedRoute,
        public demandeDocumentSrv: DemandeDocumentService,
        public typedocumentSrv: TypedocumentService,
        public etat_demande_documentSrv: EtatDemandeDocumentService) {
    }

    ngOnInit() {
        this.loadInscriptionAcads();
        /*this.loadTypeDocuments();
        this.loadEtatDocuments();*/
    }

    loadInscriptionAcads() {
        this.inscriptionAcadSrv.getInscriptionsEtudiant(this.etudiant)
            .subscribe((data: any) => {
                this.inscriptions = data;
                this.parcoursLoaded.emit(this.inscriptions);
            }, err => { this.inscriptionAcadSrv.httpSrv.handleError(err) });
    }


    isUfrSantePayant(inscriptionacad: Inscriptionacad): boolean {
        // Sécurité: vérifier que l’inscription n’est pas null / undefined
        if (!inscriptionacad) {
          return false;
        }
        
      
        // 1) Vérifier si l’étudiant est dans l’UFR des Sciences de la Santé
        const isUfrSante = inscriptionacad &&
                inscriptionacad.idspecialite &&
                inscriptionacad.idspecialite.idfiliere &&
                inscriptionacad.idspecialite.idfiliere.identite &&
                inscriptionacad.idspecialite.idfiliere.identite.identiteparent &&
                inscriptionacad.idspecialite.idfiliere.identite.identiteparent.libelleentite === 'UFR des Sciences de la Santé';
      
        // 2) Vérifier si l’étudiant est en régime payant
        const isPayant = inscriptionacad.typeRegimePaiement === 'Payant';
      
        // Retourner vrai uniquement si c'est UFR Santé + régime payant
        return isUfrSante && isPayant;
      }
      


    /*loadEtatDocuments() {
        this.etat_demande_documentSrv.findAll()
        .subscribe((data: any)=>{
            this.inscriptions = data;
        },err=>{this.inscriptionAcadSrv.httpSrv.handleError(err)});
    }*/

    /* loadTypeDocuments() {
         this.typedocumentSrv.findAll()
         .subscribe((data: any)=>{
             this.inscriptions = data;
         },err=>{this.inscriptionAcadSrv.httpSrv.handleError(err)});
     }*/

    /*showDocAdminRequestDialog(inscriptionacad: Inscriptionacad) {
        this.inscriptionacad = inscriptionacad;
        this.requestDocAdmin = true;
        this.display = true;
        this.source = 'administrative';
    }*/

    /*showDocPedagRequestDialog(inscriptionacad: Inscriptionacad) {
        this.inscriptionacad = inscriptionacad;
        this.requestDocAdmin = false;
        this.display = true;
        this.source = 'pedagogique';
    }*/

    /*requestDocument() {
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
    }*/

    /*displayDocumentModal() {
        this.modal.open(this.fileUploadModalRef, {
            size: 'lg',
            centered: true,
            keyboard: false,
            backdrop: 'static'
        });
    }*/

    dismissModal() {
        this.modal.dismissAll('Cross click');
    }
}
