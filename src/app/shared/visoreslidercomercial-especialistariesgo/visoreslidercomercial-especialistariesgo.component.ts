import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { Router } from '@angular/router';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { RelevantesInterface } from '../../interfaces/dto/relevantes.interface';

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
  relevante: RelevantesInterface;
  periodo: number;
  loading: boolean;

  @Output() isLoadingEvent = new EventEmitter<boolean>();

  constructor(public router: Router,
              public detalleService: DetalleGerenciasService) {
    this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
    if (!this.infoGerencia) {
      router.navigate(['/home']);
    }
  }
  ngOnInit(): void {
  }

  public loadData(): void{
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleService.getRelevantes(Number(this.infoGerencia.nominaGerente), this.idTipoPeriodo,  this.periodoSemana.fechaInicial,
      this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: RelevantesInterface) => {
      this.relevante = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
