import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/', null, 'tachometer', null, false, 0),
    new Menu (40, 'Pages', null, null, 'file-text-o', null, true, 0),
    new Menu (45, 'Blank', '/blank', null, 'file-o', null, false, 40),
    new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    new Menu (140, 'Level 1', null, null, 'folder-open-o', null, true, 0),
    new Menu (141, 'Level 2', null, null, 'folder-open-o', null, true, 140),
    new Menu (142, 'Level 3', null, null, 'folder-open-o', null, true, 141),
    new Menu (143, 'Level 4', null, null, 'folder-open-o', null, true, 142),
    new Menu (144, 'Level 5', null, null, 'folder-o', null, false, 143),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'external-link', '_blank', false, 0)
];

export const horizontalMenuItems = [
    new Menu (1, 'Accueil', '/', null, 'tachometer', null, false, 0),
    new Menu (20, 'Mon dossier', '/mes-infos', null, 'info', null, false, 0),
    // new Menu (40, 'Modalités de paiement', '/modalite-paiement', null, 'credit-card-alt', null, false, 0),
    new Menu (30, 'Ma bourse', null, null, 'money', null, true, 0),
    new Menu (31, 'Les états', '/bourse', null, 'credit-card', null, false, 30),
    new Menu (32, 'Mes réclamations', '/reclamationbourse', null, 'exclamation', null, false, 30),
    new Menu (40, 'Demandes de documents', '/demandedocument', null, 'file-text-o', null, false, 0),
    new Menu (50, 'Liens utiles', null, null, 'link', null, true, 0),
    new Menu (51, 'Le système LMD', '/systeme-lmd', null, 'bookmark-o', null, false, 50),
    new Menu (60, 'Admin', null, null, 'cog', null, true, 0),
    new Menu (61, 'Inscriptions', '/inscriptionacad', null, 'pencil', null, false, 60),
    new Menu (62, 'Dossiers Etudiant', '/dossieretudiant', null, 'folder', null, false, 60),
    new Menu (62, 'etudiant', '/liste-etudiant', null, 'folder', null, false, 60),

    // new Menu (45, 'Blank', '/blank', null, 'file-o', null, false, 40),
    // new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    // new Menu (200, 'External Link', null, 'http://themeseason.com', 'external-link', '_blank', false, 0)
];
