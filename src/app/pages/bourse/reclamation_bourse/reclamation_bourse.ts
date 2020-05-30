import { BourseEtudiant } from '../bourse_etudiant';
import { EtatReclamationBourse } from '../etat_reclamation_bourse/etat_reclamation_bourse';
import { Etudiant } from '../../etudiant/etudiant';

export class ReclamationBourse {
    id?: any;
    date: string;
    objet: string;
    message: string;
    bourseEtudiant: BourseEtudiant;
    etatActuel: EtatReclamationBourse;
    etudiant: Etudiant;
}
