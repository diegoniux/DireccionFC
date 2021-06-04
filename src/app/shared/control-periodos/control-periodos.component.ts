import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoPeriodoInterface } from '../../interfaces/tipoPeriodo.interface';
import { PeriodoMesInterface } from '../../interfaces/PeriodoMes.interface';
import { PeriodoSemanaInterface } from '../../interfaces/periodoSemana.interface';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { TiposPeriodoInterface } from '../../interfaces/tiposPeriodo.interface';
import { ToastrService } from 'ngx-toastr';
import { FechasPeriodoInterface } from '../../interfaces/dto/fechasPeriodo.interface';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-periodos',
  templateUrl: './control-periodos.component.html',
  styleUrls: ['./control-periodos.component.css']
})
export class ControlPeriodosComponent implements OnInit {
  tiposPeriodo: TipoPeriodoInterface[];
  idTipoPeriodo: number;
  periodoMes: PeriodoMesInterface;
  periodoSemana: PeriodoSemanaInterface;
  periodosPrevios: number;
  loading: boolean;

  @Output() changePeriodoEvent = new EventEmitter();

  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(
    private detalleGerenciaService: DetalleGerenciasService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.idTipoPeriodo = 2; // Mensual
    this.periodosPrevios = 0; // Para que se muestre el periodo actual
    this.loading = false;
    this.cargarTiposPeriodo();
    this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
  }

  get f(): any{
    return this.form.controls;
  }

  public cargarTiposPeriodo(): any
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
      this.toastrService.error(error.message, 'Aviso');
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
      this.changePeriodoEvent.emit();
      return true;
    })
    .catch(error => {
      this.toastrService.error(error.message, 'Aviso');
      return false;
    });
  }

  public onTipoPeriodoChanged(e): any
  {
    if (!e) {
      return;
    }
    this.idTipoPeriodo = e;
    this.periodosPrevios = 0;
    this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
  }

  getPeriodoDesc(): string
  {
    try {
      let desc: string;
      if (!this.periodoSemana) {
        return '';
      }

      if (this.idTipoPeriodo === 1) {

        const fechaIni = new Date(this.periodoSemana.fechaInicial.replace(/-/g, '\/'));
        const fechaFin = new Date(this.periodoSemana.fechaFinal.replace(/-/g, '\/'));
        desc = `${formatDate(fechaIni, 'd/MM/yyyy', 'es-MX')} - ${formatDate(fechaFin, 'd/MM/yyyy', 'es-MX')}`;
      }
      if (this.idTipoPeriodo === 2) {
        desc = `${this.periodoMes.mes} ${this.periodoMes.anio}`;
      }
      return desc;
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
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
    this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
  }

  isLoading(): boolean{
    return this.loading;
  }

}
