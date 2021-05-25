import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RelevantesInterface } from 'src/app/interfaces/dto/relevantes.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-relevante',
  templateUrl: './relevante.component.html',
  styleUrls: ['./relevante.component.css']
})
export class RelevanteComponent implements OnInit {
  @Output() isLoadingEvent = new EventEmitter<boolean>();
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  relevante: RelevantesInterface;
  loading: boolean;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Indicadores'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(public detalleGerenciasService: DetalleGerenciasService) {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  public getRelevantes(): any
  {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleGerenciasService.getRelevantes(this.nomina, this.idTipoPeriodo,  this.periodoSemana.fechaInicial,
      this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: RelevantesInterface) => {
      this.relevante = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
      this.barChartData = [
        { data: [this.relevante.numEspecialistasFL], label: 'Fuera de Línea' },
        { data: [this.relevante.numEspecialistasProsp], label: 'Prospectos' },
        { data: [this.relevante.numEspecialistasMR], label: 'Investigación'}
      ];
    })
    .catch(error => {
      console.error(error);
    });
  }

}
