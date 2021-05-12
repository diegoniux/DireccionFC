import { Component, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { ReporteGerenciasInterface } from 'src/app/interfaces/reporteGerencias.interface'
@Component({
  selector: 'app-reporte-gerencias',
  templateUrl: './reporte-gerencias.component.html',
  styleUrls: ['./reporte-gerencias.component.css']
})
export class ReporteGerenciasComponent implements OnInit {

  reporteGerencias: ReporteGerenciasInterface

  constructor(public detalleGerenciaService: DetalleGerenciasService) {

    this.getReporteGerencias();

   }

  ngOnInit(): void {
  }

  private getReporteGerencias(): any
  {
    this.detalleGerenciaService.getReporteGerencias()
    .toPromise()
    .then((data: ReporteGerenciasInterface) => {
      console.log(data);
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.reporteGerencias = data;
      
    })
    .catch(error => {
      console.error(error);
    });
  }

}
