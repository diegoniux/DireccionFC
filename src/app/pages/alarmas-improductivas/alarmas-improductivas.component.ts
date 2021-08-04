import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginInterface } from '../../interfaces/login.interface';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { Router } from '@angular/router';
import { GerentesService } from '../../services/gerentes.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { HeaderPizarronDigitalComponent } from '../../shared/header-pizarron-digital/header-pizarron-digital.component';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';

@Component({
  selector: 'app-alarmas-improductivas',
  templateUrl: './alarmas-improductivas.component.html',
  styleUrls: ['./alarmas-improductivas.component.css']
})
export class AlarmasImproductivasComponent implements OnInit {
  nomina: number;
  nominaGerente:number;
  loginInterface: LoginInterface;
  infoGerencia: ReporteGerencia;
  idInterval: any;
  perfilId: number;

  @ViewChild(NavBarComponent) navBarChild: NavBarComponent;
  @ViewChild(HeaderPizarronDigitalComponent) headerPizarronDigitalChild: HeaderPizarronDigitalComponent;

  constructor(private router: Router,
    public service: GerentesService,
    public loginService: LoginService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
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
          idPantalla: 6,
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
  }

  private getHeader(): any{
    if(!this.nominaGerente)
      return;
    this.headerPizarronDigitalChild.loadData(this.infoGerencia);
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
      idPantalla: 6,
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
}
