import { Inscriptionacad } from '../inscriptionacad/inscriptionacad';

export class VisiteMedicale {
    id: any;
    date: Date;
    apte: boolean;
    commentaire: string;
    inscriptionacad: Inscriptionacad;
    resultat: string;
    maladieChroniques: string;
    user: string;
    typeHandicap: string;
}
