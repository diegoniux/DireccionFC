import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { ReporteGerenciasInterface } from 'src/app/interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { Router } from '@angular/router';
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

  loading: boolean;

  @Output() isLoadingEvent = new EventEmitter<boolean>();

  constructor(public detalleGerenciaService: DetalleGerenciasService, public router: Router) {
    this.loading = false;
    this.reporteGerencias = {};
   }

  ngOnInit(): void {
  }

  public getReporteGerencias(): any
  {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleGerenciaService.getReporteGerencias(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: ReporteGerenciasInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.reporteGerencias = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

  cargarDetalleGerencia(gerencia: ReporteGerencia): void {
    try {
      localStorage.setItem('infoGerente', JSON.stringify(gerencia));
      this.router.navigate(['/home/detalleLider']);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
