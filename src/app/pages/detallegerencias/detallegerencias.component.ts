import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { BarraMetasComponent } from '../../shared/barra-metas/barra-metas.component';
import { TendenciaComponent } from '../../shared/tendencia/tendencia.component';
import { ToastrService } from 'ngx-toastr';
import { RelevanteComponent } from '../../shared/relevante/relevante.component';
import { MejorSaldoComponent } from '../../shared/mejor-saldo/mejor-saldo.component';
import { ReporteGerenciasComponent } from '../../shared/reporte-gerencias/reporte-gerencias.component';
import { Router } from '@angular/router';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { ControlPeriodosComponent } from '../../shared/control-periodos/control-periodos.component';
import { DetalleGerenciasService } from '../../services/detalle-gerencias-service.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { ModoPantallaInterface } from '../../interfaces/modoPantalla.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detallegerencias',
  templateUrl: './detallegerencias.component.html',
  styleUrls: ['./detallegerencias.component.css']
})
export class DetallegerenciasComponent implements OnInit, AfterViewInit, OnDestroy {

  // Propiedades de la clase
  nombreTitulo: string;
  nombreImg: string;
  loginInterface: LoginInterface;
  nomina: number;
  modoPantalla: ModoPantallaInterface;
  idInterval: any;

  // componentes hijos
  @ViewChild(BarraMetasComponent) barraMetasChild: BarraMetasComponent;
  @ViewChild(TendenciaComponent) tendenciasChild: TendenciaComponent;
  @ViewChild(RelevanteComponent) relevanteChild: RelevanteComponent;
  @ViewChild(MejorSaldoComponent) mejorSaldoChild: MejorSaldoComponent;
  @ViewChild(ReporteGerenciasComponent) reporteGerenciaChild: ReporteGerenciasComponent;
  @ViewChild(ControlPeriodosComponent) controlPeriodosChild: ControlPeriodosComponent;

  constructor(private router: Router,
              public detalleGerenciaService: DetalleGerenciasService,
              public loginService: LoginService,
              private toastrService: ToastrService,
              private location: Location) {
   }

  ngOnInit(): void {
    this.nombreTitulo = 'Detalle Gerencias';
    this.nombreImg = 'iconoPizarronDigital';
  }

  ngOnDestroy(): void {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.loginInterface = this.loginService.getUserLoggedIn();
      this.nomina = this.loginInterface.usuarioData.nomina;
      const logSistema: LogSistemaInterface = {
        idAccion: 3,
        idPantalla: 1,
        usuario: this.loginInterface.usuarioData.nomina
      };
      this.registrarLogPantalla(logSistema);
      // Asignación del token al servicio
      this.detalleGerenciaService.token = this.loginInterface.token;
      // cargamos el modo pantalla
      this.modoPantalla = JSON.parse(localStorage.getItem('modoPantalla'));
      if (this.modoPantalla && this.modoPantalla.modoDetalle) {
        this.nomina = this.modoPantalla.nominaDetalle;
      }

      // Carga automática de componentes cada 20 segundos
      this.idInterval = setInterval(() => this.loadData(), 60000);

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  recievePeriodo($event: any): void{
    this.loadData();
  }

  loadData(): void{
    try {
      this.cargarBarraMetas();
      this.cargarMejorSaldo();
      this.cargarRelevante();
      this.cargarTendencias();
      this.cargarReporteGerencias();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  public logOut(): any {
    // si el modo de la pantalla es modo detalle, al presionar el botón de salir, regresaremos a la pantalla anteri
    if (this.modoPantalla && this.modoPantalla.modoDetalle) {
      this.location.back();
      return;
    }

    if (confirm('¿Está seguro de cerrar sesión?')){
    this.loginService.setUserLoggedOn();
    const logSistema: LogSistemaInterface = {
      idAccion: 2,
      idPantalla: 0,
      usuario: this.loginInterface.usuarioData.nomina
    };
    this.registrarLogPantalla(logSistema);
    this.router.navigate(['/Login']);
    }
  }

  private cargarBarraMetas(): any
  {
    try {
      this.barraMetasChild.nomina = this.nomina;
      this.barraMetasChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.barraMetasChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.barraMetasChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.barraMetasChild.getBarraMetas();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarTendencias(): any
  {
    try {
      this.tendenciasChild.nomina = this.nomina;
      this.tendenciasChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.tendenciasChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.tendenciasChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.tendenciasChild.getTendencias();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarRelevante(): any
  {
    try{
      this.relevanteChild.nomina = this.nomina;
      this.relevanteChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.relevanteChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.relevanteChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.relevanteChild.getRelevantes();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarMejorSaldo(): any
  {
    try{
      this.mejorSaldoChild.nomina = this.loginInterface.usuarioData.nomina;
      this.mejorSaldoChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.mejorSaldoChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.mejorSaldoChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.mejorSaldoChild.getMejorSaldo();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarReporteGerencias(): any
  {
    try{
      this.reporteGerenciaChild.nomina = this.nomina;
      this.reporteGerenciaChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.reporteGerenciaChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.reporteGerenciaChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.reporteGerenciaChild.getReporteGerencias();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private registrarError(msg: string): any
  {
    const logError: LogErrorInterface = {
      idPantalla: 1,
      usuario: this.loginInterface.usuarioData.nomina,
      error: msg
    };

    this.loginService.setLogError(logError)
      .toPromise()
      .then((resp: any) => {
      })
      .catch(error => {
        this.toastrService.error(error.message, 'Aviso');
      });
  }

  private registrarLogPantalla(logSistema: LogSistemaInterface): any {
    this.loginService.setLogSistema(logSistema)
      .toPromise()
      .then((resp: any ) => {
      })
      .catch(error => {
        this.toastrService.error(error.message, 'Aviso');
      });
  }

  recieveIsLoading($event): void {
    const res: boolean = this.barraMetasChild.loading && this.mejorSaldoChild.loading &&
      this.relevanteChild.loading && this.tendenciasChild.loading && this.reporteGerenciaChild.loading;

    this.controlPeriodosChild.loading = res;
  }

}
