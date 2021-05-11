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
    this.getTendencias();
  }

  ngOnInit(): void {
  }

  private getTendencias(): any
  {
    this.detalleGerenciasService.getTendencias()
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
