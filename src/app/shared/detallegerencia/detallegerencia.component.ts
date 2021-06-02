import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { MejorSaldoInterface } from '../../interfaces/mejorSaldo.interface';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { DetalleGerenciaInterface } from '../../interfaces/DetalleGerencia.interface';
import { Router } from '@angular/router';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { DetalleLiderComercialService } from '../../services/detalle-lider-comercial.service';

@Component({
  selector: 'app-detallegerencia',
  templateUrl: './detallegerencia.component.html',
  styleUrls: ['./detallegerencia.component.css']
})
export class DetallegerenciaComponent implements OnInit {
  infoGerencia: ReporteGerencia;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  detalle: DetalleGerenciaInterface;
  periodo: number;
  loading: boolean;

  @Output() isLoadingEvent = new EventEmitter<boolean>();

  constructor(public router: Router,
              public detalleService: DetalleLiderComercialService) {
  }

  ngOnInit(): void {
  }

  public loadData(): void{
    // obtenmos la información desde el servicio
    this.detalleService.getDetalleGerencia(this.infoGerencia.nominaGerente)
    .toPromise()
    .then((data: DetalleGerenciaInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.detalle = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
