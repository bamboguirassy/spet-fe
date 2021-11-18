import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'GPE - Etudiant',
        "Gestion du parcours de l'étudiant - Espace Etudiant",
        {
            menu: 'horizontal', //horizontal , vertical
            menuType: 'default', //default, compact, mini
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: false,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'light'  //light , dark, blue, green, combined, purple, orange, brown, grey, pink          
        }
    )
}