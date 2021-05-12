import { Component, OnInit } from '@angular/core';
import { RelevantesInterface } from 'src/app/interfaces/dto/relevantes.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';

@Component({
  selector: 'app-relevante',
  templateUrl: './relevante.component.html',
  styleUrls: ['./relevante.component.css']
})
export class RelevanteComponent implements OnInit {

  relevante: RelevantesInterface;
  constructor(public detalleGerenciasService: DetalleGerenciasService) { 
    this.getRelevantes(17608, 1, "2021-05-03T00:00:00", "2021-05-09T00:00:00");
  }

  ngOnInit(): void {
  }

  private getRelevantes(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any
  {
    this.detalleGerenciasService.getRelevantes(nomina, tipoPeriodo, fechaInicio, fechaFin)
    .toPromise()
    .then((data: RelevantesInterface) => {
      this.relevante = data;
      console.log(this.relevante);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
