import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { Router } from '@angular/router';
import { DetalleLiderComercialService } from '../../services/detalle-lider-comercial.service';
import { EspecialistasRiesgoInterface } from '../../interfaces/EspecialistasRiesgo.interface';

@Component({
  selector: 'app-visoreslidercomercial-especialistariesgo',
  templateUrl: './visoreslidercomercial-especialistariesgo.component.html',
  styleUrls: ['./visoreslidercomercial-especialistariesgo.component.css']
})
export class VisoreslidercomercialEspecialistariesgoComponent implements OnInit {
  infoGerencia: ReporteGerencia;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  especialistasRiesgo: EspecialistasRiesgoInterface;
  periodo: number;
  loading: boolean;

  @Output() isLoadingEvent = new EventEmitter<boolean>();

  constructor(public router: Router,
              public detalleService: DetalleLiderComercialService) {
    this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
    if (!this.infoGerencia) {
      router.navigate(['/home']);
    }
  }
  ngOnInit(): void {
  }

  public loadData(): void{
    // obtenmos la información desde el servicio
    this.detalleService.getEspecialistasRiesgo(this.infoGerencia.nominaGerente, this.idTipoPeriodo,
        this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: EspecialistasRiesgoInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.especialistasRiesgo = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
