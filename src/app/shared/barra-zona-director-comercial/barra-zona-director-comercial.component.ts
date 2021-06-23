import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { DetalleDirectorComercialService } from '../../services/detalle-director-comercial.service';
import { BarraZonaDirectorComercialInterface } from '../../interfaces/dto/BarraZonaDirectorComercial.interface';

@Component({
  selector: 'app-barra-zona-director-comercial',
  templateUrl: './barra-zona-director-comercial.component.html',
  styleUrls: ['./barra-zona-director-comercial.component.css']
})
export class BarraZonaDirectorComercialComponent implements OnInit {
  @Output() isLoadingEvent = new EventEmitter();

  zona: string;
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;
  barraZonaDirectorComercial: BarraZonaDirectorComercialInterface;

  constructor(public detalleDirectorComercialService: DetalleDirectorComercialService) { }

  ngOnInit(): void {
  }
  public loadData(): any {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleDirectorComercialService.getEncabezadoZonaDireccionComercial(this.nomina, this.idTipoPeriodo,
      this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: BarraZonaDirectorComercialInterface) => {
      this.barraZonaDirectorComercial = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
