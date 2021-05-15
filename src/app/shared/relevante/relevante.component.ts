import { Component, OnInit } from '@angular/core';
import { RelevantesInterface } from 'src/app/interfaces/dto/relevantes.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';

@Component({
  selector: 'app-relevante',
  templateUrl: './relevante.component.html',
  styleUrls: ['./relevante.component.css']
})
export class RelevanteComponent implements OnInit {
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  relevante: RelevantesInterface;
  loading: boolean;

  constructor(public detalleGerenciasService: DetalleGerenciasService) {
    this.loading = false;
  }

  ngOnInit(): void {
  }

  public getRelevantes(): any
  {
    this.loading = true;
    this.detalleGerenciasService.getRelevantes(this.nomina, this.idTipoPeriodo,  this.periodoSemana.fechaInicial,
      this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: RelevantesInterface) => {
      this.relevante = data;
      this.loading = false;
    })
    .catch(error => {
      console.error(error);
    });
  }

}
