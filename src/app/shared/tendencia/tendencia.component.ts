import { Component, OnInit } from '@angular/core';
import { TendenciasInterface } from '../../interfaces/dto/tendencias.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';

@Component({
  selector: 'app-tendencia',
  templateUrl: './tendencia.component.html',
  styleUrls: ['./tendencia.component.css']
})
export class TendenciaComponent implements OnInit {

  tendencias: TendenciasInterface;
  constructor(public detalleGerenciasService: DetalleGerenciasService) { 
    this.getTendencias(17608, 1, "2021-05-03T00:00:00", "2021-05-09T00:00:00");
  }

  ngOnInit(): void {
  }

  private getTendencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any
  {
    this.detalleGerenciasService.getTendencias(nomina, tipoPeriodo, fechaInicio, fechaFin)
    .toPromise()
    .then((data: TendenciasInterface) => {
      this.tendencias = data;
      console.log(this.tendencias)
    })
    .catch(error => {
      console.error(error);
    });
  }

}
