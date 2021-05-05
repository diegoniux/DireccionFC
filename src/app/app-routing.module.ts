import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeModule } from './modules/home/home.module';
import { PizarronDigitalModule } from './modules/pizarron-digital/pizarron-digital.module';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => HomeModule),
    canActivate : [AuthGuard],
    // Lazy Modules y PreLoad
    data: {preload: true}
   },
   {
    path: 'pizarron-digital',
    loadChildren: () => import('./modules/pizarron-digital/pizarron-digital.module').then(m => PizarronDigitalModule),
    canActivate : [AuthGuard],
    // Lazy Modules y PreLoad
    data: {preload: true}
   },
  {
   path: '**',
   redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true } )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
