import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { DetalleDireccionComercial } from '../../interfaces/detalle-direccion-comercial.interface';
import { DetalleDirectorComercialService } from '../../services/detalle-director-comercial.service';

@Component({
  selector: 'app-detalle-direccion-comercial',
  templateUrl: './detalle-direccion-comercial.component.html',
  styleUrls: ['./detalle-direccion-comercial.component.css']
})
export class DetalleDireccionComercialComponent implements OnInit {
  @Output() isLoadingEvent = new EventEmitter();
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;
  detalleDirecgtorComercial: DetalleDireccionComercial;

  constructor(public detalleDirectorComercialService: DetalleDirectorComercialService) { }

  ngOnInit(): void {
  }

  public loadData(): any {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleDirectorComercialService.getDetalleDireccionComercial(this.nomina, this.idTipoPeriodo,
      this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: DetalleDireccionComercial) => {
      this.detalleDirecgtorComercial = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
