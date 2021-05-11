import { Component, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { BarraMetasInterface } from 'src/app/interfaces/barraMetas.interface';

@Component({
  selector: 'app-barra-metas',
  templateUrl: './barra-metas.component.html',
  styleUrls: ['./barra-metas.component.css']
})
export class BarraMetasComponent implements OnInit {



  barraMetas: BarraMetasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {

    this.getBarraMetas();
   }

  ngOnInit(): void {
  }

  private getBarraMetas(): any
  {
    this.detalleGerenciaService.getBarraMetas()
    .toPromise()
    .then((data: BarraMetasInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.barraMetas = data;
    })
    .catch(error => {
      console.error(error);
    });
  }

}
