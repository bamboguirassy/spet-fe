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
    new Menu (10, 'Le système LMD', '/systeme-lmd', null, 'bookmark-o', null, false, 0),
    new Menu (20, 'Mon dossier', '/mes-infos', null, 'user', null, false, 0),
    // new Menu (30, 'Mon parcours', '/mon-parcours', null, 'list', null, false, 0),
    // new Menu (40, 'Modalités de paiement', '/modalite-paiement', null, 'credit-card-alt', null, false, 0),
    // new Menu (30, 'Etat des Bourses', '/bourse', null, 'money', null, false, 0),
    // new Menu (40, 'Resultats et réclamations', null, null, 'file-text-o', null, true, 0),
    // new Menu (45, 'Blank', '/blank', null, 'file-o', null, false, 40),
    // new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    // new Menu (200, 'External Link', null, 'http://themeseason.com', 'external-link', '_blank', false, 0)
];
