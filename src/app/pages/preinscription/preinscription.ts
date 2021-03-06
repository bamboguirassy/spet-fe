import { Pays } from "../pays/pays";
import { Regimeinscription } from "../regimeinscription/regimeinscription";

export class Preinscription {
    id: any;
    idfiliere: any;
    idanneeacad: any;
    idniveau: any;
    cni: string;
    idtypeadmission: any;
    ine: string;
    passage: string;
    prenometudiant: string;
    nometudiant: string;
    datenaiss: string;
    lieunaiss: string;
    email: string;
    tel: string;
    datenotif: string;
    datedelai: string;
    estinscrit: string;
    codeOperateur: string;
    datePaiement: string;
    numeroTransaction: string;
    montant: any;
    paiementConfirme: boolean;
    nationalite: Pays;
    idregimeinscription: Regimeinscription;
}
