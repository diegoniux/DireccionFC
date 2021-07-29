import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GerentesService } from '../../services/gerentes.service';

@Component({
  selector: 'app-control-productividad',
  templateUrl: './control-productividad.component.html',
  styleUrls: ['./control-productividad.component.css']
})
export class ControlProductividadComponent implements OnInit {

  loading: boolean;

  DiariaSemana: boolean = true;
  anteriorPosterior: boolean = true;

  @Output() changePeriodoEvent = new EventEmitter<boolean>();

  constructor(public service: GerentesService) {

  }

  ngOnInit(): void {
  }

  public cargarPeriodo(sentido: number): any
  {
    if(sentido > 0){
      //siguiente periodo
      this.anteriorPosterior = true;
    }else{
      //anterior periodo
      this.anteriorPosterior = false;
    }
    this.changePeriodoEvent.emit(true);
  }

  public cambiarPeriodo(productividad: number): any
  {
    if(productividad == 1){
      //periodo diario
      this.DiariaSemana = true;
    }else{
      //periodo semanal
      this.DiariaSemana = false;
    }
    this.changePeriodoEvent.emit(false);
  }
  
}
