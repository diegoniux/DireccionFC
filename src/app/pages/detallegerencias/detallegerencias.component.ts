import { Component, OnInit } from '@angular/core';
import { TipoPeriodo } from 'src/app/interfaces/tipoPeriodo.interface';
import { DetalleGerenciasServiceService } from 'src/app/services/detalle-gerencias-service.service';
import { TiposPeriodoInterface } from '../../interfaces/tiposPeriodo.interface';

@Component({
  selector: 'app-detallegerencias',
  templateUrl: './detallegerencias.component.html',
  styleUrls: ['./detallegerencias.component.css']
})
export class DetallegerenciasComponent implements OnInit {

  nombreTitulo: string;
  nombreImg: string;
  tiposPeriodo: TipoPeriodo[];

  constructor(public detalleGerenciaService: DetalleGerenciasServiceService) {
    this.nombreTitulo = 'Detalle Gerencias';
    this.nombreImg = 'iconoPizarronDigital';

    this.cargarTiposPeriodo();
   }

  ngOnInit(): void {

  }

  private cargarTiposPeriodo(): any
  {
    this.detalleGerenciaService.getTiposPeriodos()
    .toPromise()
    .then((data: TiposPeriodoInterface) => {
        this.tiposPeriodo = data.listTiposPetiodo;
        console.log(this.tiposPeriodo);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
