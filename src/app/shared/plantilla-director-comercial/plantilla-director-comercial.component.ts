import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserInfoInterface } from '../../interfaces/userInfo.interface';
import { Router } from '@angular/router';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';

@Component({
  selector: 'app-plantilla-director-comercial',
  templateUrl: './plantilla-director-comercial.component.html',
  styleUrls: ['./plantilla-director-comercial.component.css']
})
export class PlantillaDirectorComercialComponent implements OnInit {
  @Output() nominaSelectedEvent = new EventEmitter();
  
  listaPlantilla:UserInfoInterface[];
  usrOne = {
    id: 1,
    nomina: 22222,
    nombres: 'Richi', 
    apellidos: 'Garza', 
    coordinacion: 'Monterrey', 
    saldoAcumulado: '$ 10M', 
    porcentaje: '50%', 
    positivo: false, 
    foto: 'https://pbs.twimg.com/profile_images/792844379635408897/4pwOSKD6_400x400.jpg'
  };
  usrTwo = {
    id: 2,
    nomina: 33333,
    nombres: 'Camilo', 
    apellidos: 'Grimaldo', 
    coordinacion: 'Monterrey2', 
    saldoAcumulado: '$ 6M', 
    porcentaje: '35%', 
    positivo: true, 
    foto: 'https://pbs.twimg.com/profile_images/908667096971620353/9CkybC7v_400x400.jpg'
  };
  usrThree = {
    id: 3,
    nomina: 44444,
    nombres: 'Diego', 
    apellidos: 'Nieto', 
    coordinacion: 'Morelia', 
    saldoAcumulado: '$ 1M', 
    porcentaje: '10%', 
    positivo: true, 
    foto: 'https://avatars.githubusercontent.com/u/36705902?v=4'
  };
  focusUsr:UserInfoInterface;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;

  constructor() {
    this.listaPlantilla = [];
    this.listaPlantilla.push(this.usrOne);
    this.listaPlantilla.push(this.usrTwo);
    this.listaPlantilla.push(this.usrThree);
    this.focusUsr = this.listaPlantilla[0];
  }

  ngOnInit(): void {
  }

  public selectedUser(id:number): any {
    if(id > this.listaPlantilla.length)
      id = 1;
    else if (id == 0)
      id = this.listaPlantilla.length;
      
    this.listaPlantilla.forEach(i => {
      if(i.id == id){
        this.focusUsr = this.listaPlantilla[id-1];
        this.nominaSelectedEvent.emit();
      }
    });
  }
}
