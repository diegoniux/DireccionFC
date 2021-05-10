import { Component, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { BarraMetasInterface } from 'src/app/interfaces/barraMetas.interface'

@Component({
  selector: 'app-barra-metas',
  templateUrl: './barra-metas.component.html',
  styleUrls: ['./barra-metas.component.css']
})
export class BarraMetasComponent implements OnInit {



  barraMetas: BarraMetasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {

    this.getBerraMetas();
   }

  ngOnInit(): void {
  }

  private getBerraMetas(): any
  {
    this.detalleGerenciaService.getBerraMetas()
    .toPromise()
    .then((data: BarraMetasInterface) => {
        this.barraMetas = data;
        console.log(this.barraMetas);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
