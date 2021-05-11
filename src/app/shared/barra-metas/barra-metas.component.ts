import { Component, OnInit } from '@angular/core';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { BarraMetasInterface } from 'src/app/interfaces/barraMetas.interface'
// For MDB Angular Free
import { PopoverModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-barra-metas',
  templateUrl: './barra-metas.component.html',
  styleUrls: ['./barra-metas.component.css']
})
export class BarraMetasComponent implements OnInit {

  public modalSV: string = '<div class="row"><div class="col-12"><div class="row"><div class="col-6"><p>Saldo Virtual</p></div><div class="col-6"><p>${{ barraMetas.popUpSV.saldoVirtual }}</p></div></div></div><div class="col-12"><div class="row"><div class="col-6"><p>Saldo Cantado</p></div><div class="col-6"><p>${{ barraMetas.popUpSV.saldoCantado }}</p></div></div></div><div class="col-12"><div class="row"><div class="col-6"><p>Saldo Acumulado</p></div><div class="col-6"><p>${{ barraMetas.popUpSV.saldoAcumulado }}</p></div></div></div></div>'

  barraMetas: BarraMetasInterface;

  constructor(public detalleGerenciaService: DetalleGerenciasService) {

    this.getBarraMetas();

   }

  ngOnInit(): void {
  }

  private getBarraMetas(): any
  {
    this.detalleGerenciaService.getBarraMetas()
    .toPromise()
    .then((data: BarraMetasInterface) => {
      console.log(data);
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.barraMetas = data;
      
    })
    .catch(error => {
      console.error(error);
    });
  }

}
