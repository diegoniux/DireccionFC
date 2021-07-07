import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { DetallelidercomercialComponent } from '../../pages/detallelidercomercial/detallelidercomercial.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DetalleDirectorComercialComponent } from 'src/app/pages/detalle-director-comercial/detalle-director-comercial.component';
import { PlantillaGerenciaComponent } from '../../pages/plantilla-gerencia/plantilla-gerencia.component';
import { PizarronDigitalComponent } from '../../pages/pizarron-digital/pizarron-digital.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detalleLider',
    component: DetallelidercomercialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detalleDirectorComercial',
    component: DetalleDirectorComercialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productividadAgentes',
    component: PlantillaGerenciaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pizarronDigital',
    component: PizarronDigitalComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
