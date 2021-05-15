import { Component, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { ReporteGerenciasInterface } from 'src/app/interfaces/reporteGerencias.interface'
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
@Component({
  selector: 'app-reporte-gerencias',
  templateUrl: './reporte-gerencias.component.html',
  styleUrls: ['./reporte-gerencias.component.css']
})
export class ReporteGerenciasComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  reporteGerencias: ReporteGerenciasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {
   }

  ngOnInit(): void {
  }

  public getReporteGerencias(): any
  {
    this.detalleGerenciaService.getReporteGerencias(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: ReporteGerenciasInterface) => {
      console.log(data);
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.reporteGerencias = data;
    })
    .catch(error => {
      console.error(error);
    });
  }

}
