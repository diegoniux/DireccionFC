import { Component, OnInit } from '@angular/core';
import { UserInfoInterface } from '../../interfaces/userInfo.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';

@Component({
  selector: 'app-barra-coordinacion-director-comercial',
  templateUrl: './barra-coordinacion-director-comercial.component.html',
  styleUrls: ['./barra-coordinacion-director-comercial.component.css']
})
export class BarraCoordinacionDirectorComercialComponent implements OnInit {
  focusUsr:UserInfoInterface;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
