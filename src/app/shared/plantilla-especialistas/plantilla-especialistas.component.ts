import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EspecialistaInterface } from 'src/app/interfaces/especialista.interface';
import { PlantillaEspecialistasInterface } from '../../interfaces/dto/plantillaEspecialistas.interface';
import { GerentesService } from '../../services/gerentes.service';

@Component({
  selector: 'app-plantilla-especialistas',
  templateUrl: './plantilla-especialistas.component.html',
  styleUrls: ['./plantilla-especialistas.component.css']
})
export class PlantillaEspecialistasComponent implements OnInit {
  nominaGerente:number;
  plantilla:EspecialistaInterface[];

  loading: boolean;
  @Output() isLoadingEvent = new EventEmitter<boolean>();
  constructor(public service: GerentesService) { 
    this.getPlantilla();
  }

  ngOnInit(): void {
  }

  private getPlantilla(): any {
    this.nominaGerente = 26720;
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.service.getPlantilla(this.nominaGerente.toString())
    .toPromise()
    .then((data: PlantillaEspecialistasInterface) =>{
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.plantilla = data.promotores;
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

}
