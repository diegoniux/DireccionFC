import { Component, Input, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { BarraMetasInterface } from 'src/app/interfaces/barraMetas.interface';
import { PeriodoMesInterface } from 'src/app/interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from 'src/app/interfaces/periodoSemana.interface';


@Component({
  selector: 'app-barra-metas',
  templateUrl: './barra-metas.component.html',
  styleUrls: ['./barra-metas.component.css']
})
export class BarraMetasComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;

  barraMetas: BarraMetasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {
   }

  ngOnInit(): void {
  }

  public getBarraMetas(): any
  {
    console.log('entre');
    console.log(this.nomina);
    this.detalleGerenciaService.getBarraMetas(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
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
