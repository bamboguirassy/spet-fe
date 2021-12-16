import {Inscriptionacad} from '../inscriptionacad/inscriptionacad';
import {Modepaiement} from '../modepaiement/modepaiement';


export class PaiementFraisEncadrememnt {
    id: any;
    datePaiement: any;
    montantPaye: any;
    methodePaiement: Modepaiement;
    inscriptionacad: Inscriptionacad;
    operateur: string;
}
