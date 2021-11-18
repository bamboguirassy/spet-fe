import { Etudiant } from '../etudiant/etudiant';
import { VisiteMedicale } from '../visite_medical/visite_medicale';

export class Inscriptionacad {
    id: any;
    dateinscacad: string;
    passage: string;
    etat: string;
    montantinscriptionacad: any;
    coutformation: string;
    numquittance: string;
    cartetiree: boolean;
    certificattire: boolean;
    valide: boolean;
    quitusBu: boolean;
    quitusSocial: boolean;
    quitusMedical: boolean;
    quitusComptabilite: boolean;
    quitusVieUniversitaire: boolean;
    croust: boolean;
    universitepartenaire: string;
    sourcefinancement: string;
    coencadreur: string;
    premiereanneeinscription: string;
    datemodification: string;
    moyenneAnnuelle: string;
    totalCredit: string;
    creditCapitalise: string;
    decisionConseil: string;
    idregimeinscription: any;
    idetudiant: Etudiant;
    idspecialite: any;
    idclasse: any;
    idmodaliteenseignement: any;
    idmodepaiement: any;
    idfiliere: any;
    source: string;
    // temporal fields
    visiteMedicale: VisiteMedicale;
}
