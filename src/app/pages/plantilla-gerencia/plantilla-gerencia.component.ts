import { Component, ViewChild, OnInit } from '@angular/core';
import { PlantillaEspecialistasInterface } from '../../interfaces/dto/plantillaEspecialistas.interface';
import { EspecialistaGerenteInterface } from '../../interfaces/especialistaGerente.interface';
import { GerentesService } from '../../services/gerentes.service';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { LoginInterface } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { Router } from '@angular/router';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { HeaderPizarronDigitalComponent } from '../../shared/header-pizarron-digital/header-pizarron-digital.component';

@Component({
  selector: 'app-plantilla-gerencia',
  templateUrl: './plantilla-gerencia.component.html',
  styleUrls: ['./plantilla-gerencia.component.css']
})
export class PlantillaGerenciaComponent implements OnInit { 
  nomina: number;
  nominaGerente:number;
  nombreTitulo: string
  nombreImg: string
  loginInterface: LoginInterface;
  plantilla:EspecialistaGerenteInterface[];
  infoGerencia: ReporteGerencia;
  idInterval: any;
  perfilId: number;

  @ViewChild(NavBarComponent) navBarChild: NavBarComponent;
  @ViewChild(HeaderPizarronDigitalComponent) headerPizarronDigitalChild: HeaderPizarronDigitalComponent;

  constructor(private router: Router,
              public service: GerentesService,
              public loginService: LoginService,
              private toastrService: ToastrService) { 
  }

  ngOnInit(): void {
    this.nombreTitulo = "Productividad Agentes";
    this.nombreImg = "iconoProductividad";    
  }

  ngOnDestroy(): void {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.loginInterface = this.loginService.getUserLoggedIn();
      this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
      this.perfilId = +this.loginInterface.usuarioData.perfilUsuarioId;
      // Obtiene Nóminas
      this.nomina = +this.loginInterface.usuarioData.nomina;
      this.nominaGerente = +this.infoGerencia.nominaGerente;

      this.navBarChild.perfilId = this.loginInterface.usuarioData.perfilUsuarioId;
      this.navBarChild.nomina = this.nomina;
      this.loadData();
      const logSistema: LogSistemaInterface = {
          idAccion: 3,
          idPantalla: 5,
          usuario: this.loginInterface.usuarioData.nomina
        };
      this.registrarLogPantalla(logSistema);

      if (!this.nominaGerente) {
        this.router.navigate(['/home']);
      }
      // Carga automática de componentes cada 1 minuto
      this.idInterval = setInterval(() => this.loadData(), 60000);

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private loadData(): void {
    this.getHeader();
    this.getPlantilla(); 
  }

  private getHeader(): any{
    if(!this.nominaGerente)
      return;
    
    this.headerPizarronDigitalChild.loadData(this.infoGerencia);
    
  }

  private getPlantilla(): any {
    // this.loading = true;
    // this.isLoadingEvent.emit(this.loading);
    this.service.getPlantilla(this.nominaGerente.toString())
    .toPromise()
    .then((data: PlantillaEspecialistasInterface) =>{
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      this.plantilla = data.promotores;
      // this.loading = false;
      // this.isLoadingEvent.emit(this.loading);
    })
    .catch(error => {
      console.error(error);
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
  recieveIsLoading($event): void {
    const res: boolean = this.headerPizarronDigitalChild.loading;    
    //this.controlPeriodosChild.loading = res;
  }

  public porcentajeSaldoAcumuladoDesc (saldoAcumulado: string, SaldoVirtual: string): string {
    let response: string;
    if(Number(SaldoVirtual) == 1)
      return '0%';
    else if( Number(saldoAcumulado) <= Number(SaldoVirtual) )
      return '0%';

    response = ((Number(saldoAcumulado) - Number(SaldoVirtual)) * 100).toString() + `%`;
    return response;
  }

  public removeDecimals(str: string): string{
    let response: string;
    response = str.split('.')[0];
    return response;
  }
}
