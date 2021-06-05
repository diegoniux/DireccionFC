import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { AvanceInterface } from '../../interfaces/dto/Avance.interface';
import { Router } from '@angular/router';
import { DetalleLiderComercialService } from '../../services/detalle-lider-comercial.service';
import { NotificacionesInterface } from '../../interfaces/Notificaciones.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { TendenciasInterface } from '../../interfaces/dto/tendencias.interface';

@Component({
  selector: 'app-avance-lidercomercial',
  templateUrl: './avance-lidercomercial.component.html',
  styleUrls: ['./avance-lidercomercial.component.css']
})
export class AvanceLidercomercialComponent implements OnInit {
  infoGerencia: ReporteGerencia;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  avanceGerencia: AvanceInterface;
  notificaciones: NotificacionesInterface;
  tendencias: TendenciasInterface;
  periodo: number;
  loading: boolean;

  @Output() isLoadingEvent = new EventEmitter<boolean>();

  constructor(public router: Router,
              public detalleService: DetalleLiderComercialService,
              public detalleGerenciasService: DetalleGerenciasService) {
    this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
    if (!this.infoGerencia) {
      router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  public loadData(): void{
    this.loading = true;
    // obtenmos la información desde el servicio
    this.detalleService.getAvance(this.infoGerencia.nominaGerente, this.idTipoPeriodo,
        this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: AvanceInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.avanceGerencia = data;
      console.log(this.avanceGerencia);
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });

    this.loading = true;
    this.detalleService.getNotificaciones(this.infoGerencia.nominaGerente, this.idTipoPeriodo,
      this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: NotificacionesInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.notificaciones = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });

    this.loading = true;
    this.detalleGerenciasService.getTendencias(Number(this.infoGerencia.nominaGerente), this.idTipoPeriodo,
      this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: TendenciasInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.tendencias = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
