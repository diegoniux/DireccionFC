import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { DetallelidercomercialComponent } from '../../pages/detallelidercomercial/detallelidercomercial.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DetalleDirectorComercialComponent } from 'src/app/pages/detalle-director-comercial/detalle-director-comercial.component';

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
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
