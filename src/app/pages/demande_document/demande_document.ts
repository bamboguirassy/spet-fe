import {Inscriptionacad} from '../inscriptionacad/inscriptionacad';
import {Typedocument} from '../typedocument/typedocument';
import {EtatDemandeDocument} from './etat_demande_document/etat_demande_document';

export class DemandeDocument {
    id: any;
    typedocument: Typedocument;
    intitule: string;
    etatActuel: EtatDemandeDocument;
    inscriptionacad: Inscriptionacad;
    nature: string;
    date: Date;
}
