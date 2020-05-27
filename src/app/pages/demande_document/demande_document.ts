import {Inscriptionacad} from '../inscriptionacad/inscriptionacad';
import {Typedocument} from '../typedocument/typedocument';

export class DemandeDocument {
    id: any;
    typedocument: Typedocument;
    intitule: string;
    etat_actuel: number;
    inscriptionacad: Inscriptionacad;
    nature: string;
    date: Date;
}
