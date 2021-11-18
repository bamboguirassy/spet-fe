import { EtatReclamationBourse } from '../etat_reclamation_bourse/etat_reclamation_bourse';
import { ReclamationBourse } from '../reclamation_bourse/reclamation_bourse';

export class HistoriqueEtatReclamation {
    id: any;
    date: string;
    userEmail: string;
    etat: EtatReclamationBourse;
    reclamation: ReclamationBourse;
}
