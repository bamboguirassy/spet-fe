import { Etudiant } from '../etudiant/etudiant';
import { Typedocument } from './typedocument';

export class DocumentEtudiant {
    id: any;
    filename: string;
    url: string;
    dateAjout: string;
    titreDocument: string;
    estValide: boolean;
    dateValidation: Date;
    userValidation: string;
    etudiant: Etudiant;
    typeDocument: Typedocument;
}