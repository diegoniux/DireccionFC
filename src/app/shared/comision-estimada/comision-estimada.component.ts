import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { ComisionEstimadaInterface } from '../../interfaces/ComisionEstimada.interface';
import { Router } from '@angular/router';
import { DetalleLiderComercialService } from '../../services/detalle-lider-comercial.service';

@Component({
  selector: 'app-comision-estimada',
  templateUrl: './comision-estimada.component.html',
  styleUrls: ['./comision-estimada.component.css']
})
export class ComisionEstimadaComponent implements OnInit {
  infoGerencia: ReporteGerencia;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  comisionEstimada: ComisionEstimadaInterface;
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
    this.detalleService.getComisionEstimada(this.infoGerencia.nominaGerente, this.idTipoPeriodo,
        this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: ComisionEstimadaInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.comisionEstimada = data;
      console.log(this.comisionEstimada);
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
