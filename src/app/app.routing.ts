import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, 
  /*{
  //preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
  // useHash: true
}*/);