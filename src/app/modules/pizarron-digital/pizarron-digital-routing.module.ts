import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PizarronDigitalComponent } from '../../pages/pizarron-digital/pizarron-digital.component';
import { AuthGuard } from '../../guards/auth.guard';
import { PlantillaGerenciaComponent } from '../../pages/plantilla-gerencia/plantilla-gerencia.component';

const routes: Routes = [
  {
  path: '',
  component: PizarronDigitalComponent
},
{
  path: 'productividadAgentes',
  component: PlantillaGerenciaComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizarronDigitalRoutingModule { }
