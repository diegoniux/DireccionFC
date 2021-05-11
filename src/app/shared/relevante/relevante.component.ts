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
    this.getRelevantes();
  }

  ngOnInit(): void {
  }

  private getRelevantes(): any
  {
    this.detalleGerenciasService.getRelevantes()
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
