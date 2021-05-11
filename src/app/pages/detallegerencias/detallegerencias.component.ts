import { Component, OnInit } from '@angular/core';
import { FechasPeriodoInterface } from 'src/app/interfaces/dto/fechasPeriodo.interface';
import { PeriodoMesInterface } from 'src/app/interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from 'src/app/interfaces/periodoSemana.interface';
import { TipoPeriodoInterface } from 'src/app/interfaces/tipoPeriodo.interface';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { TiposPeriodoInterface } from '../../interfaces/tiposPeriodo.interface';

@Component({
  selector: 'app-detallegerencias',
  templateUrl: './detallegerencias.component.html',
  styleUrls: ['./detallegerencias.component.css']
})
export class DetallegerenciasComponent implements OnInit {

  // Propiedades de la clase
  nombreTitulo: string;
  nombreImg: string;
  tiposPeriodo: TipoPeriodoInterface[];
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodosPrevios: number;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {
    this.nombreTitulo = 'Detalle Gerencias';
    this.nombreImg = 'iconoPizarronDigital';
    this.idTipoPeriodo = 2; // Mensual
    this.periodosPrevios = 0; // Para que se muestre el periodo actual
   }

  ngOnInit(): void {
    this.cargarTiposPeriodo();
    this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
  }

  private cargarTiposPeriodo(): any
  {
    this.detalleGerenciaService.getTiposPeriodos()
    .toPromise()
    .then((data: TiposPeriodoInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.tiposPeriodo = data.listTiposPeriodo;
      console.log(this.tiposPeriodo);
    })
    .catch(error => {
      console.error(error);
    });
  }

  private cargarFechasPeriodo(mesSemanaPervios: number, idTipoPeriodo: number): any
  {
    this.detalleGerenciaService.getFechasPeriodos(mesSemanaPervios, idTipoPeriodo)
    .toPromise()
    .then((data: FechasPeriodoInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.idTipoPeriodo = idTipoPeriodo;
      this.periodoMes = data.periodoMes;
      this.periodoSemana = data.periodoSemana;
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
