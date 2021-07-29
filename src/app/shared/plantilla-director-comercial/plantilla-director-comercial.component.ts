import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserInfoInterface } from '../../interfaces/userInfo.interface';
import { Router } from '@angular/router';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { plantillaDirectorComercialInterface } from '../../interfaces/dto/plantillaDirectorComercial.interface';
import { DetalleDirectorComercialService } from '../../services/detalle-director-comercial.service';

@Component({
  selector: 'app-plantilla-director-comercial',
  templateUrl: './plantilla-director-comercial.component.html',
  styleUrls: ['./plantilla-director-comercial.component.css']
})
export class PlantillaDirectorComercialComponent implements OnInit {
  @Output() nominaSelectedEvent = new EventEmitter();
  @Output() isLoadingEvent = new EventEmitter();

  perfilUsuarioId: number;
  listaPlantilla: UserInfoInterface[];
  focusUsr: UserInfoInterface;
  nomina: number;
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodo: number;
  loading: boolean;
  idSelected: number;

  constructor(public detalleDirectorComercialService: DetalleDirectorComercialService) {
  }

  ngOnInit(): void {
    localStorage.setItem('idSelected', '0');
  }

  public loadData(): any {
    this.loading = true;
    this.isLoadingEvent.emit(this.loading);
    this.detalleDirectorComercialService.getPlantillaDireccionComercial(this.nomina, this.idTipoPeriodo, this.periodoSemana.fechaInicial
      , this.periodoSemana.fechaFinal)
    .toPromise()
    .then((data: plantillaDirectorComercialInterface) => {
      this.listaPlantilla = data.listaPlantilla;
      this.idSelected = +localStorage.getItem('idSelected');
      if (this.idSelected && this.idSelected > 0) {
        this.selectedUser(this.idSelected);
      } else {
        this.focusUsr = this.listaPlantilla[0];
        this.nominaSelectedEvent.emit();
      }
      this.loading = false;
      this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
    });
  }

  public selectedUser(id: number): any {
    if (id > this.listaPlantilla.length){
      id = 1;
    }
    else if (id === 0) {
      id = this.listaPlantilla.length;
    }
    this.listaPlantilla.forEach(i => {
      if (i.id === id) {
        localStorage.setItem('idSelected', (id).toString());
        this.focusUsr = this.listaPlantilla[id - 1];
        this.nominaSelectedEvent.emit();
      }
    });
  }
}
