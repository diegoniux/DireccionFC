import { Component, OnInit } from '@angular/core';
import { TendenciasInterface } from '../../interfaces/dto/tendencias.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';

@Component({
  selector: 'app-tendencia',
  templateUrl: './tendencia.component.html',
  styleUrls: ['./tendencia.component.css']
})
export class TendenciaComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  tendencias: TendenciasInterface;

  constructor(public detalleGerenciasService: DetalleGerenciasService) {
  }

  ngOnInit(): void {
  }

  public getTendencias(): any
  {
    this.detalleGerenciasService.getTendencias(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: TendenciasInterface) => {
      this.tendencias = data;
      console.log(this.tendencias);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
