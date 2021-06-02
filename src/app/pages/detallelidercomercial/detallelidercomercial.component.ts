import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DetallegerenciaComponent } from '../../shared/detallegerencia/detallegerencia.component';
import { ControlPeriodosComponent } from '../../shared/control-periodos/control-periodos.component';
import { ComisionEstimadaComponent } from '../../shared/comision-estimada/comision-estimada.component';
import { MejorSaldoComponent } from '../../shared/mejor-saldo/mejor-saldo.component';
import { RelevantesAppsComponent } from '../../shared/relevantes-apps/relevantes-apps.component';
import { VisoreslidercomercialEspecialistariesgoComponent } from '../../shared/visoreslidercomercial-especialistariesgo/visoreslidercomercial-especialistariesgo.component';
import { AvanceLidercomercialComponent } from '../../shared/avance-lidercomercial/avance-lidercomercial.component';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';
@Component({
  selector: 'app-detallelidercomercial',
  templateUrl: './detallelidercomercial.component.html',
  styleUrls: ['./detallelidercomercial.component.css']
})
export class DetallelidercomercialComponent implements OnInit, AfterViewInit {

  nombreTitulo: string;
  nombreImg: string;
  loginInterface: LoginInterface;
  infoGerencia: ReporteGerencia;

  // Componentes hijos
  @ViewChild(DetallegerenciaComponent) detalleGerenciaChild: DetallegerenciaComponent;
  @ViewChild(ControlPeriodosComponent) controlPeriodosChild: ControlPeriodosComponent;
  @ViewChild(ComisionEstimadaComponent) comsisionEstimadaChild: ComisionEstimadaComponent;
  @ViewChild(MejorSaldoComponent) mejorSaldoChild: MejorSaldoComponent;
  @ViewChild(VisoreslidercomercialEspecialistariesgoComponent) visoresChild: VisoreslidercomercialEspecialistariesgoComponent;
  @ViewChild(AvanceLidercomercialComponent) avanceChild: AvanceLidercomercialComponent;
  @ViewChild(RelevantesAppsComponent) relevanteChild: RelevantesAppsComponent;


  form = new FormGroup({
    tipoPeriodo: new FormControl(2, Validators.required)
  });

  constructor(private router: Router,
              public loginService: LoginService,
              private toastrService: ToastrService) {
    this.nombreTitulo = 'Detalle Líder Comercial';
    this.nombreImg = 'iconoPizarronDigital';
    this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    try {
      this.loginInterface = this.loginService.getUserLoggedIn();
      this.controlPeriodosChild.nomina = this.loginInterface.usuarioData.nomina;
      const logSistema: LogSistemaInterface = {
        idAccion: 3,
        idPantalla: 2,
        usuario: this.loginInterface.usuarioData.nomina
      };
      this.registrarLogPantalla(logSistema);

      if (!this.infoGerencia) {
        this.router.navigate(['/home']);
      }
      // Carga automática de componentes cada 1 minuto
      setInterval(() => this.loadData(), 60000);

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
      this.cargardetalleGerencia();
      this.cargarComisionEstimada();
      this.cargarMejorSaldo();
      this.cargarVisores();
      this.cargarAvance();
      this.cargarRelevanteApps();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  public logOut(): any {
    if (confirm('¿Está seguro de cerrar sesión?')){
    this.loginService.setUserLoggedOn();
    const logSistema: LogSistemaInterface = {
      idAccion: 2,
      idPantalla: 0,
      usuario: this.controlPeriodosChild.nomina
    };
    this.registrarLogPantalla(logSistema);
    this.router.navigate(['/Login']);
    }
  }

  private cargardetalleGerencia(): any
  {
    try {
      this.detalleGerenciaChild.infoGerencia = this.infoGerencia;
      this.detalleGerenciaChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.detalleGerenciaChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.detalleGerenciaChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.detalleGerenciaChild.loadData();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarComisionEstimada(): any
  {
    try {
      this.comsisionEstimadaChild.infoGerencia = this.infoGerencia;
      this.comsisionEstimadaChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.comsisionEstimadaChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.comsisionEstimadaChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.comsisionEstimadaChild.loadData();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarVisores(): any
  {
    try{
      this.visoresChild.infoGerencia = this.infoGerencia;
      this.visoresChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.visoresChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.visoresChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.visoresChild.loadData();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarMejorSaldo(): any
  {
    try{
      this.mejorSaldoChild.nomina = Number(this.infoGerencia.nominaGerente);
      this.mejorSaldoChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.mejorSaldoChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.mejorSaldoChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.mejorSaldoChild.getMejorSaldo();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarAvance(): any
  {
    try{
      this.avanceChild.infoGerencia = this.infoGerencia;
      this.avanceChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.avanceChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.avanceChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.avanceChild.loadData();
    }catch (error){
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private cargarRelevanteApps(): any
  {
    try{
      this.relevanteChild.infoGerencia = this.infoGerencia;
      this.relevanteChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
      this.relevanteChild.periodoMes = this.controlPeriodosChild.periodoMes;
      this.relevanteChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
      this.relevanteChild.loadData();
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
    const res: boolean = this.detalleGerenciaChild.loading && this.mejorSaldoChild.loading &&
      this.relevanteChild.loading && this.comsisionEstimadaChild.loading && this.avanceChild.loading
      && this.visoresChild.loading;
    this.controlPeriodosChild.loading = res;
  }
}
