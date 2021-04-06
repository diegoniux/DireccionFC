import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizarronDigitalComponent } from '../../pages/pizarron-digital/pizarron-digital.component';

const routes: Routes = [{
  path: '',
  component: PizarronDigitalComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizarronDigitalRoutingModule { }
