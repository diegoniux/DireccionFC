import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LoginInterface } from '../../interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BarraZonaDirectorComercialComponent } from '../../shared/barra-zona-director-comercial/barra-zona-director-comercial.component';
import { PlantillaDirectorComercialComponent } from '../../shared/plantilla-director-comercial/plantilla-director-comercial.component';
import { ControlPeriodosComponent } from '../../shared/control-periodos/control-periodos.component';

@Component({
  selector: 'app-detalle-director-comercial',
  templateUrl: './detalle-director-comercial.component.html',
  styleUrls: ['./detalle-director-comercial.component.css']
})
export class DetalleDirectorComercialComponent implements OnInit {


  nombreTitulo: string;
  nombreImg: string;
  loginInterface: LoginInterface;


  // Componentes hijos
  @ViewChild(ControlPeriodosComponent) controlPeriodosChild: ControlPeriodosComponent;
  @ViewChild(PlantillaDirectorComercialComponent) plantillaDirectorComercialChild: PlantillaDirectorComercialComponent;
  @ViewChild(BarraZonaDirectorComercialComponent) barraZonaDirectorComercialChild: BarraZonaDirectorComercialComponent;
  
  
  constructor(private router: Router, public loginService: LoginService, private toastrService: ToastrService) {
    this.nombreTitulo = 'Director Comercial';
    this.nombreImg = 'iconoPizarronDigital';
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    try {
      this.loginInterface = this.loginService.getUserLoggedIn();
      const logSistema: LogSistemaInterface = {
        idAccion: 3,
        idPantalla: 1,
        usuario: this.loginInterface.usuarioData.nomina
      };
      // this.registrarLogPantalla(logSistema);
      // Asignación del token al servicio
      // this.detalleGerenciaService.token = this.loginInterface.token;

      // Carga automática de componentes cada 20 segundos
      setInterval(() => this.loadData(), 60000);

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      // this.registrarError(error.message);
    }
  }

  public logOut(): any {
    if (confirm('¿Está seguro de cerrar sesión?')){
    this.loginService.setUserLoggedOn();
    const logSistema: LogSistemaInterface = {
      idAccion: 2,
      idPantalla: 0,
      usuario: this.loginInterface.usuarioData.nomina
    };
    // this.registrarLogPantalla(logSistema);
    this.router.navigate(['/Login']);
    }
  }

  recievePeriodo($event: any): void{
    this.loadData();
  }
  recieveNominaSelected($event: any): void{
    this.cargaDatosBarraDatosZona();
  }

  loadData(): void{
    try {
      //this.controlPeriodosChild.loading = true;
      this.cargaDatosplantillaDirectorComercial();
      if(this.barraZonaDirectorComercialChild.nomina != null || this.loginInterface.usuarioData.perfilUsuarioId == 7)
        this.cargaDatosBarraDatosZona();

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      // this.registrarError(error.message);
    }
  }

  private cargaDatosplantillaDirectorComercial(): any {
    this.plantillaDirectorComercialChild.perfilUsuarioId = this.loginInterface.usuarioData.perfilUsuarioId;
    this.plantillaDirectorComercialChild.nomina = this.loginInterface.usuarioData.nomina;
    this.plantillaDirectorComercialChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
    this.plantillaDirectorComercialChild.periodoMes = this.controlPeriodosChild.periodoMes;
    this.plantillaDirectorComercialChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
    this.plantillaDirectorComercialChild.loadData();
  }

  private cargaDatosBarraDatosZona(): any {
    if(this.loginInterface.usuarioData.perfilUsuarioId == 7){
      this.barraZonaDirectorComercialChild.zona = this.loginInterface.usuarioData.zona;
      this.barraZonaDirectorComercialChild.nomina = this.loginInterface.usuarioData.nomina;
    } else {
      this.barraZonaDirectorComercialChild.zona = this.plantillaDirectorComercialChild.focusUsr.zona;
      this.barraZonaDirectorComercialChild.nomina = this.plantillaDirectorComercialChild.focusUsr.nomina;
    }
    this.barraZonaDirectorComercialChild.idTipoPeriodo = this.controlPeriodosChild.idTipoPeriodo;
    this.barraZonaDirectorComercialChild.periodoMes = this.controlPeriodosChild.periodoMes;
    this.barraZonaDirectorComercialChild.periodoSemana = this.controlPeriodosChild.periodoSemana;
    this.barraZonaDirectorComercialChild.loadData();
  }
}
