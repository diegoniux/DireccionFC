import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { RelevanteAppsInterface } from '../../interfaces/RelevanteApps.interface';
import { Router } from '@angular/router';
import { DetalleLiderComercialService } from '../../services/detalle-lider-comercial.service';

@Component({
  selector: 'app-relevantes-apps',
  templateUrl: './relevantes-apps.component.html',
  styleUrls: ['./relevantes-apps.component.css']
})
export class RelevantesAppsComponent implements OnInit {
  infoGerencia: ReporteGerencia;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  relevanteApps: RelevanteAppsInterface;
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
    this.loading = true;
    // obtenmos la información desde el servicio
    this.detalleService.getRelevanteApps(this.infoGerencia.nominaGerente, this.idTipoPeriodo,
        this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: RelevanteAppsInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.relevanteApps = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
