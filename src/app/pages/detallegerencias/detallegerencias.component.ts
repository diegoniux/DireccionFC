import { Component, OnInit, ViewChild } from '@angular/core';
import { FechasPeriodoInterface } from 'src/app/interfaces/dto/fechasPeriodo.interface';
import { PeriodoMesInterface } from 'src/app/interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from 'src/app/interfaces/periodoSemana.interface';
import { TipoPeriodoInterface } from 'src/app/interfaces/tipoPeriodo.interface';
import { DetalleGerenciasService } from 'src/app/services/detalle-gerencias-service.service';
import { TiposPeriodoInterface } from '../../interfaces/tiposPeriodo.interface';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { BarraMetasComponent } from '../../shared/barra-metas/barra-metas.component';

@Component({
  selector: 'app-detallegerencias',
  templateUrl: './detallegerencias.component.html',
  styleUrls: ['./detallegerencias.component.css']
})
export class DetallegerenciasComponent implements OnInit {

  // Propiedades de la clase
  nombreTitulo: string;
  nombreImg: string;
  tiposPeriodo: TipoPeriodoInterface[];
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodosPrevios: number;
  nomina: number;

  // componenter hijos
  @ViewChild(BarraMetasComponent) barraMetasChild: BarraMetasComponent;

  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(public detalleGerenciaService: DetalleGerenciasService, public loginService: LoginService) {
    try {
      this.nombreTitulo = 'Detalle Gerencias';
      this.nombreImg = 'iconoPizarronDigital';
      this.idTipoPeriodo = 2; // Mensual
      this.periodosPrevios = 0; // Para que se muestre el periodo actual
      this.cargarTiposPeriodo();
      this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
      this.nomina = this.loginService.getUserLoggedIn().usuarioData.nomina;
    } catch (error) {
      console.log(error);
    }

   }

  ngOnInit(): void {

  }

  private cargarTiposPeriodo(): any
  {
    this.detalleGerenciaService.getTiposPeriodos()
    .toPromise()
    .then((data: TiposPeriodoInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.tiposPeriodo = data.listTiposPeriodo;
    })
    .catch(error => {
      console.error(error);
    });
  }

  public cargarFechasPeriodo(mesSemanaPervios: number, idTipoPeriodo: number): any
  {
    this.detalleGerenciaService.getFechasPeriodos(mesSemanaPervios, idTipoPeriodo)
    .toPromise()
    .then((data: FechasPeriodoInterface) => {
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.idTipoPeriodo = idTipoPeriodo;
      this.periodoMes = data.periodoMes;
      this.periodoSemana = data.periodoSemana;
      console.log(data);
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }

  get f(): any{
    return this.form.controls;
  }

  public onTipoPeriodoChanged(e): any
  {
    console.log(e);
    this.idTipoPeriodo = e;
    this.periodosPrevios = 0;
    this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
  }

  getPeriodoDesc(): string
  {
    try {
      let desc: string;
      if (this.idTipoPeriodo === 1) {
        desc = `${this.periodoSemana.fechaInicial} - ${this.periodoSemana.fechaFinal}`;
      }
      if (this.idTipoPeriodo === 2) {
        desc = `${this.periodoMes.mes} ${this.periodoMes.anio}`;
      }
      return desc;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  public cargarPeriodo(sentido: number): any
  {
    this.periodosPrevios += sentido;
    if (sentido === 1 && this.periodosPrevios > 0) {
      this.periodosPrevios = 0;
      return;
    }
    // if (this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo)) {
    //   console.log('ola');
    //   this.cargarBarraMetas();
    // }
  }

  private cargarBarraMetas(): any
  {
    try {
      console.log('ola2');
      this.barraMetasChild.nomina = this.nomina;
      this.barraMetasChild.idTipoPeriodo = this.idTipoPeriodo;
      this.barraMetasChild.periodoMes = this.periodoMes;
      this.barraMetasChild.periodoSemana = this.periodoSemana;
      this.barraMetasChild.getBarraMetas();
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }
}
