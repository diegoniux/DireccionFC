import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GerentesService } from '../../services/gerentes.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { LoginService } from 'src/app/services/login.service';
import { ModoPantallaInterface } from '../../interfaces/modoPantalla.interface';
import { ToastrService } from 'ngx-toastr';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { HeaderPizarronDigitalComponent } from '../../shared/header-pizarron-digital/header-pizarron-digital.component';

@Component({
  selector: 'app-pizarron-digital',
  templateUrl: './pizarron-digital.component.html',
  styleUrls: ['./pizarron-digital.component.css']
})
export class PizarronDigitalComponent implements OnInit {

  nombreTitulo: string
  nombreImg: string
  loginInterface: LoginInterface;
  nomina: number = 26720;
  modoPantalla: ModoPantallaInterface;
  idInterval: any;

  // componentes hijos
  @ViewChild(HeaderPizarronDigitalComponent) headerPizarronDigitalChild: HeaderPizarronDigitalComponent;

  constructor(public loginService: LoginService,
              private toastrService: ToastrService,
              public gerentesService: GerentesService) { 
    
  }

  ngOnInit(): void {
    this.nombreTitulo = "Pizarrón Digital"
    this.nombreImg = "iconoPizarronDigital"
  }

  ngOnDestroy(): void {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.loginInterface = this.loginService.getUserLoggedIn();
      // this.nomina = this.loginInterface.usuarioData.nomina;
      // const logSistema: LogSistemaInterface = {
      //   idAccion: 3,
      //   idPantalla: 1,
      //   usuario: this.loginInterface.usuarioData.nomina
      // };
      // this.registrarLogPantalla(logSistema);
      // Asignación del token al servicio
      this.gerentesService.token = this.loginInterface.token;
      // cargamos el modo pantalla
      this.modoPantalla = JSON.parse(localStorage.getItem('modoPantalla'));
      if (this.modoPantalla && this.modoPantalla.modoDetalle) {
        this.nomina = this.modoPantalla.nominaDetalle;
      }
      this.loadData();
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
      this.headerPizarronDigitalChild.loadData(this.nomina,'');
      // this.cargarBarraMetas();
      // this.cargarMejorSaldo();
      // this.cargarRelevante();
      // this.cargarTendencias();
      // this.cargarReporteGerencias();
    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      // this.registrarError(error.message);
    }
  }


  private registrarError(msg: string): any
  {
    const logError: LogErrorInterface = {
      idPantalla: 5,//cual es numero de esta pantalla
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
