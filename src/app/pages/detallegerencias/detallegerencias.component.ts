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
import { formatDate } from '@angular/common';
import { TendenciaComponent } from '../../shared/tendencia/tendencia.component';
import { ToastrService } from 'ngx-toastr';
import { RelevanteComponent } from '../../shared/relevante/relevante.component';
import { MejorSaldoComponent } from '../../shared/mejor-saldo/mejor-saldo.component';
import { ReporteGerenciasComponent } from '../../shared/reporte-gerencias/reporte-gerencias.component';

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
  @ViewChild(TendenciaComponent) tendenciasChild: TendenciaComponent;
  @ViewChild(RelevanteComponent) relevanteChild: RelevanteComponent;
  @ViewChild(MejorSaldoComponent) mejorSaldoChild: MejorSaldoComponent;
  @ViewChild(ReporteGerenciasComponent) reporteGerenciaChild: ReporteGerenciasComponent;

  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(public detalleGerenciaService: DetalleGerenciasService,
              public loginService: LoginService,
              private toastrService: ToastrService) {
   }

  ngOnInit(): void {
    try {
      this.nombreTitulo = 'Detalle Gerencias';
      this.nombreImg = 'iconoPizarronDigital';
      this.idTipoPeriodo = 2; // Mensual
      this.periodosPrevios = 0; // Para que se muestre el periodo actual
      this.cargarTiposPeriodo();
      this.cargarFechasPeriodo(this.periodosPrevios, this.idTipoPeriodo);
      this.nomina = this.loginService.getUserLoggedIn().usuarioData.nomina;
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
    }
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
      if (!this.periodoSemana.fechaInicial) {
        return true;
      }
      this.cargarBarraMetas();
      this.cargarTendencias();
      this.cargarRelevante();
      this.cargarMejorSaldo();
      this.cargarReporteGerencias();
      return true;
    })
    .catch(error => {
      this.toastrService.error(error.message, 'Aviso');
      return false;
    });
  }

  get f(): any{
    return this.form.controls;
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

  private cargarBarraMetas(): any
  {
    try {
      this.barraMetasChild.nomina = this.nomina;
      this.barraMetasChild.idTipoPeriodo = this.idTipoPeriodo;
      this.barraMetasChild.periodoMes = this.periodoMes;
      this.barraMetasChild.periodoSemana = this.periodoSemana;
      this.barraMetasChild.getBarraMetas();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
    }
  }

  private cargarTendencias(): any
  {
    try {
      this.tendenciasChild.nomina = this.nomina;
      this.tendenciasChild.idTipoPeriodo = this.idTipoPeriodo;
      this.tendenciasChild.periodoMes = this.periodoMes;
      this.tendenciasChild.periodoSemana = this.periodoSemana;
      this.tendenciasChild.getTendencias();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
    }
  }

  private cargarRelevante(): any
  {
    try{
      this.relevanteChild.nomina = this.nomina;
      this.relevanteChild.idTipoPeriodo = this.idTipoPeriodo;
      this.relevanteChild.periodoMes = this.periodoMes;
      this.relevanteChild.periodoSemana = this.periodoSemana;
      this.relevanteChild.getRelevantes();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
    }
  }

  private cargarMejorSaldo(): any
  {
    try{
      this.mejorSaldoChild.nomina = this.nomina;
      this.mejorSaldoChild.idTipoPeriodo = this.idTipoPeriodo;
      this.mejorSaldoChild.periodoMes = this.periodoMes;
      this.mejorSaldoChild.periodoSemana = this.periodoSemana;
      this.mejorSaldoChild.getMejorSaldo();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
    }
  }

  private cargarReporteGerencias(): any
  {
    try{
      this.reporteGerenciaChild.nomina = this.nomina;
      this.reporteGerenciaChild.idTipoPeriodo = this.idTipoPeriodo;
      this.reporteGerenciaChild.periodoMes = this.periodoMes;
      this.reporteGerenciaChild.periodoSemana = this.periodoSemana;
      this.reporteGerenciaChild.getReporteGerencias();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
    }
  }
}
