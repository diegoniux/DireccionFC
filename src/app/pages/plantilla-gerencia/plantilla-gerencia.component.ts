import { Component, ViewChild, OnInit } from '@angular/core';
import { PlantillaEspecialistasInterface } from '../../interfaces/dto/plantillaEspecialistas.interface';
import { EspecialistaInterface } from '../../interfaces/especialista.interface';
import { GerentesService } from '../../services/gerentes.service';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { LoginInterface } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { Router } from '@angular/router';
import { LogErrorInterface } from '../../interfaces/logError.interface';

@Component({
  selector: 'app-plantilla-gerencia',
  templateUrl: './plantilla-gerencia.component.html',
  styleUrls: ['./plantilla-gerencia.component.css']
})
export class PlantillaGerenciaComponent implements OnInit {
  nombreTitulo: string
  nombreImg: string
  loginInterface: LoginInterface;
  plantilla:EspecialistaInterface[];
  infoGerencia: ReporteGerencia;
  idInterval: any;

  @ViewChild(NavBarComponent) navBar: NavBarComponent;

  constructor(private router: Router,
              public service: GerentesService,
              public loginService: LoginService,
              private toastrService: ToastrService) { 
    this.nombreTitulo = "Productividad Agentes";
    this.nombreImg = "iconoProductividad";
    this.infoGerencia = JSON.parse(localStorage.getItem('infoGerente'));
    this.loadData();
  }

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
      this.navBar.perfilId = this.loginInterface.usuarioData.perfilUsuarioId;
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
      this.idInterval = setInterval(() => this.loadData(), 60000);

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
  }

  private loadData(): any {
    this.getPlantilla(); 
  }

  private getPlantilla(): any {
    // this.loading = true;
    // this.isLoadingEvent.emit(this.loading);
    this.service.getPlantilla(this.infoGerencia.nominaGerente)
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
}
