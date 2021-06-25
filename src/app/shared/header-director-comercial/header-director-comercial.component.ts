import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderDirectorComercial } from 'src/app/interfaces/header-director-comercial.iterface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { DetalleDirectorComercialService } from '../../services/detalle-director-comercial.service';

@Component({
  selector: 'app-header-director-comercial',
  templateUrl: './header-director-comercial.component.html',
  styleUrls: ['./header-director-comercial.component.css']
})
export class HeaderDirectorComercialComponent implements OnInit {
  @Output() isLoadingEvent = new EventEmitter();
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;
  headerDirectorComercial: HeaderDirectorComercial;

  constructor(public detalleDirectorComercialService: DetalleDirectorComercialService) { }

  ngOnInit(): void {
  }

  public loadData(): any {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleDirectorComercialService.getHeaderDirectorComercial(this.nomina, this.idTipoPeriodo,
      this.periodoSemana.fechaInicial, this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: HeaderDirectorComercial) => {
      this.headerDirectorComercial = data;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
