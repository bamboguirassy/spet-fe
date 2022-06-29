import { Injectable, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Menu } from './menu.model';
// import { verticalMenuItems } from './menu';
// import { horizontalMenuItems } from './menu';
import { FosUser } from 'src/app/pages/fos_user/fos_user';

@Injectable()
export class MenuService {

  adminRoles = ['SA', 'ADSOS', 'ADMIN_DSOS', 'AG_DSOS', 'DIR_DSOS','ADMIN','DSOS'];
  etudiantRole = 'ETU';

  constructor(private location: Location,
    private renderer2: Renderer2,
    private router: Router) {}


  // public getVerticalMenuItems(): Array<Menu> {
  //   return verticalMenuItems;
  // }

  public getHorizontalMenuItems(currentUser: FosUser): Array<Menu> {
    return [
      new Menu(1, 'Accueil', '/', null, 'tachometer', null, false, 0, true),
      new Menu(20, 'Mon dossier', '/mes-infos', null, 'info', null, false, 0,currentUser.idgroup.codegroupe=='ETU'),
      // new Menu (40, 'Modalités de paiement', '/modalite-paiement', null, 'credit-card-alt', null, false, 0),
      // new Menu (30, 'Ma bourse', null, null, 'money', null, true, 0),
      // new Menu (31, 'Les états', '/bourse', null, 'credit-card', null, false, 30),
      // new Menu (32, 'Mes réclamations', '/reclamationbourse', null, 'exclamation', null, false, 30),
      // new Menu (40, 'Demandes de documents', '/demandedocument', null, 'file-text-o', null, false, 0),
      // new Menu(70, 'Espace de paiement', '/espace-paiement', null, 'money', null, false, 0, currentUser.idgroup.codegroupe=='ETU'),
      new Menu(50, 'Liens utiles', null, null, 'link', null, true, 0, true),
      new Menu(51, 'Le système LMD', '/systeme-lmd', null, 'bookmark-o', null, false, 50, true),
      new Menu(60, 'Admin', null, null, 'cog', null, true, 0, this.adminRoles.includes(currentUser.idgroup.codegroupe)),
      // new Menu (61, 'Inscriptions', '/inscriptionacad', null, 'pencil', null, false, 60),
      // new Menu (62, 'Dossiers Etudiant', '/dossieretudiant', null, 'folder', null, false, 60),
      new Menu(61, 'Classes', '/classe', null, 'folder', null, false, 60, true),
      new Menu(62, 'Articles', '/article', null, 'file-o', null, false, 60, true),
      new Menu(63, 'Reclamation Paie', '/reclamation-paiement', null, 'money', null, false, 60, true),

      // new Menu (45, 'Blank', '/blank', null, 'file-o', null, false, 40),
      // new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
      // new Menu (200, 'External Link', null, 'http://themeseason.com', 'external-link', '_blank', false, 0)
    ];
  }

  public createMenu(menu: Array<Menu>, nativeElement, type, currentUser) {
    if (type == 'vertical') {
      this.createVerticalMenu(menu, nativeElement, currentUser);
    }
    if (type == 'horizontal') {
      this.createHorizontalMenu(menu, nativeElement, currentUser);
    }
  }

  public createVerticalMenu(menu: Array<Menu>, nativeElement, currentUser: FosUser) {
    let menu0 = this.renderer2.createElement('div');
    this.renderer2.setAttribute(menu0, 'id', 'menu0');
    menu.forEach((menuItem) => {
      if (menuItem.parentId == 0) {
        let subMenu = this.createVerticalMenuItem(menu, menuItem, currentUser);
        this.renderer2.appendChild(menu0, subMenu);
      }
    });
    this.renderer2.appendChild(nativeElement, menu0);
  }

  public createHorizontalMenu(menu: Array<Menu>, nativeElement, currentUser: FosUser) {
    let nav = this.renderer2.createElement('div');
    this.renderer2.setAttribute(nav, 'id', 'navigation');
    let ul = this.renderer2.createElement('ul');
    this.renderer2.addClass(ul, 'menu');
    this.renderer2.appendChild(nav, ul);
    menu.forEach((menuItem) => {
      if (menuItem.parentId == 0 && menuItem.visible) {
        let subMenu = this.createHorizontalMenuItem(menu, menuItem, currentUser);
        this.renderer2.appendChild(ul, subMenu);
      }
    });
    this.renderer2.appendChild(nativeElement, nav);
  }

  public createVerticalMenuItem(menu: Array<Menu>, menuItem, currentUser: FosUser) {
    let div = this.renderer2.createElement('div');
    this.renderer2.addClass(div, 'card');
    this.renderer2.setAttribute(div, 'id', 'menu' + menuItem.id);
    let link = this.renderer2.createElement('a');
    this.renderer2.addClass(link, 'menu-item-link');
    this.renderer2.setAttribute(link, 'data-toggle', 'tooltip');
    this.renderer2.setAttribute(link, 'data-placement', 'right');
    this.renderer2.setAttribute(link, 'data-animation', 'false');
    this.renderer2.setAttribute(link, 'data-container', '.vertical-menu-tooltip-place');
    this.renderer2.setAttribute(link, 'data-original-title', menuItem.title);
    let icon = this.renderer2.createElement('i');
    this.renderer2.addClass(icon, 'fa');
    this.renderer2.addClass(icon, 'fa-' + menuItem.icon);
    this.renderer2.appendChild(link, icon);
    let span = this.renderer2.createElement('span');
    this.renderer2.addClass(span, 'menu-title');
    this.renderer2.appendChild(link, span);
    let menuText = this.renderer2.createText(menuItem.title);
    this.renderer2.appendChild(span, menuText);
    this.renderer2.setAttribute(link, 'id', 'link' + menuItem.id);
    this.renderer2.addClass(link, 'transition');
    this.renderer2.appendChild(div, link);
    if (menuItem.routerLink) {
      this.renderer2.listen(link, "click", () => {
        this.router.navigate([menuItem.routerLink]);
        this.setActiveLink(menu, link);
        this.closeOtherSubMenus(div);
      });
    }
    if (menuItem.href) {
      this.renderer2.setAttribute(link, 'href', menuItem.href);
    }
    if (menuItem.target) {
      this.renderer2.setAttribute(link, 'target', menuItem.target);
    }
    if (menuItem.hasSubMenu) {
      this.renderer2.addClass(link, 'collapsed');
      let caret = this.renderer2.createElement('b');
      this.renderer2.addClass(caret, 'fa');
      this.renderer2.addClass(caret, 'fa-angle-up');
      this.renderer2.appendChild(link, caret);
      this.renderer2.setAttribute(link, 'data-toggle', 'collapse');
      this.renderer2.setAttribute(link, 'href', '#collapse' + menuItem.id);
      let collapse = this.renderer2.createElement('div');
      this.renderer2.setAttribute(collapse, 'id', 'collapse' + menuItem.id);
      this.renderer2.setAttribute(collapse, 'data-parent', '#menu' + menuItem.parentId);
      this.renderer2.addClass(collapse, 'collapse');
      this.renderer2.appendChild(div, collapse);
      this.createSubMenu(menu, menuItem.id, collapse, 'vertical', currentUser);
    }
    return div;
  }

  public createHorizontalMenuItem(menu: Array<Menu>, menuItem, currentUser: FosUser) {
    let li = this.renderer2.createElement('li');
    this.renderer2.addClass(li, 'menu-item');
    let link = this.renderer2.createElement('a');
    this.renderer2.addClass(link, 'menu-item-link');
    this.renderer2.setAttribute(link, 'data-toggle', 'tooltip');
    this.renderer2.setAttribute(link, 'data-placement', 'top');
    this.renderer2.setAttribute(link, 'data-animation', 'false');
    this.renderer2.setAttribute(link, 'data-container', '.horizontal-menu-tooltip-place');
    this.renderer2.setAttribute(link, 'data-original-title', menuItem.title);
    let icon = this.renderer2.createElement('i');
    this.renderer2.addClass(icon, 'fa');
    this.renderer2.addClass(icon, 'fa-' + menuItem.icon);
    this.renderer2.appendChild(link, icon);
    let span = this.renderer2.createElement('span');
    this.renderer2.addClass(span, 'menu-title');
    this.renderer2.appendChild(link, span);
    let menuText = this.renderer2.createText(menuItem.title);
    this.renderer2.appendChild(span, menuText);
    this.renderer2.appendChild(li, link);
    this.renderer2.setAttribute(link, 'id', 'link' + menuItem.id);
    this.renderer2.addClass(link, 'transition');
    if (menuItem.routerLink) {
      this.renderer2.listen(link, "click", () => {
        this.router.navigate([menuItem.routerLink]);
        this.setActiveLink(menu, link);
      });
    }
    if (menuItem.href) {
      this.renderer2.setAttribute(link, 'href', menuItem.href);
    }
    if (menuItem.target) {
      this.renderer2.setAttribute(link, 'target', menuItem.target);
    }
    if (menuItem.hasSubMenu) {
      this.renderer2.addClass(li, 'menu-item-has-children');
      let subMenu = this.renderer2.createElement('ul');
      this.renderer2.addClass(subMenu, 'sub-menu');
      this.renderer2.appendChild(li, subMenu);
      this.createSubMenu(menu, menuItem.id, subMenu, 'horizontal', currentUser);
    }
    return li;
  }

  private createSubMenu(menu: Array<Menu>, menuItemId, parentElement, type, currentUser: FosUser) {
    let menus = menu.filter(item => item.parentId === menuItemId);
    menus.forEach((menuItem) => {
      let subMenu = null;
      if (type == 'vertical') {
        subMenu = this.createVerticalMenuItem(menu, menuItem, currentUser);
      }
      if (type == 'horizontal') {
        subMenu = this.createHorizontalMenuItem(menu, menuItem, currentUser);
      }
      this.renderer2.appendChild(parentElement, subMenu);
    });
  }

  private closeOtherSubMenus(elem) {
    let children = (this.renderer2.parentNode(elem)).children;
    for (let i = 0; i < children.length; i++) {
      let child = this.renderer2.nextSibling(children[i].children[0]);
      if (child) {
        this.renderer2.addClass(children[i].children[0], 'collapsed');
        this.renderer2.removeClass(child, 'show');
      }
    }
  }

  public getActiveLink(menu: Array<Menu>) {
    let url = this.location.path();
    let routerLink = (url) ? url : '/'; // url.substring(1, url.length);
    let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let activeLink = document.querySelector("#link" + activeMenuItem[0].id);
      return activeLink;
    }
    return false;
  }

  public setActiveLink(menu: Array<Menu>, link) {
    if (link) {
      menu.forEach((menuItem) => {
        let activeLink = document.querySelector("#link" + menuItem.id);
        if (activeLink) {
          if (activeLink.classList.contains('active-link')) {
            activeLink.classList.remove('active-link');
          }
        }
      });
      this.renderer2.addClass(link, 'active-link');
    }
  }

  public showActiveSubMenu(menu: Array<Menu>) {
    let url = this.location.path();
    let routerLink = url; //url.substring(1, url.length);
    let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let activeLink = document.querySelector("#link" + activeMenuItem[0].id);
      let parent = this.renderer2.parentNode(activeLink);
      while (this.renderer2.parentNode(parent)) {
        parent = this.renderer2.parentNode(parent);
        if (parent.className == 'collapse') {
          let parentMenu = menu.filter(item => item.id === activeMenuItem[0].parentId);
          let activeParentLink = document.querySelector("#link" + parentMenu[0].id);
          this.renderer2.removeClass(activeParentLink, 'collapsed');
          this.renderer2.addClass(parent, 'show');
        }
        if (parent.classList.contains('menu-wrapper')) {
          break;
        }
      }
    }
  }

  public addNewMenuItem(menu: Array<Menu>, newMenuItem, type, currentUser: FosUser) {
    menu.push(newMenuItem);
    if (newMenuItem.parentId != 0) {
      let parentMenu = menu.filter(item => item.id === newMenuItem.parentId);
      if (parentMenu.length) {
        if (!parentMenu[0].hasSubMenu) {
          parentMenu[0].hasSubMenu = true;
          // parentMenu[0].routerLink = null;
        }
      }
    }
    let menu_wrapper = null;
    if (type == 'vertical') {
      menu_wrapper = document.getElementById('vertical-menu');
    }
    if (type == 'horizontal') {
      menu_wrapper = document.getElementById('horizontal-menu');
    }
    while (menu_wrapper.firstChild) {
      menu_wrapper.removeChild(menu_wrapper.firstChild);
    }
    this.createMenu(menu, menu_wrapper, type, currentUser);
  }

}