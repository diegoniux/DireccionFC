import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GerentesService } from '../../services/gerentes.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { LoginService } from 'src/app/services/login.service';
import { ModoPantallaInterface } from '../../interfaces/modoPantalla.interface';
import { ToastrService } from 'ngx-toastr';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { ComisionEstimadaInterface } from '../../interfaces/ComisionEstimada.interface';
import { ProductividadDiariaInterface } from '../../interfaces/ProductividadDiaria.interface';
import { ProductividadSemanalInterface } from '../../interfaces/ProductividadSemanal.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { HeaderPizarronDigitalComponent } from '../../shared/header-pizarron-digital/header-pizarron-digital.component';
import { ControlProductividadComponent } from '../../shared/control-productividad/control-productividad.component';
import { ComisionBonoPdComponent } from '../../shared/comision-bono-pd/comision-bono-pd.component';
import { DetalleProductividadComponent } from '../../shared/detalle-productividad/detalle-productividad.component';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';


@Component({
  selector: 'app-pizarron-digital',
  templateUrl: './pizarron-digital.component.html',
  styleUrls: ['./pizarron-digital.component.css']
})
export class PizarronDigitalComponent implements OnInit {

  nominaGerente:number;
  nombreTitulo: string
  nombreImg: string
  loginInterface: LoginInterface;
  gerencia: ReporteGerencia
  nomina: number;
  modoPantalla: ModoPantallaInterface;
  idInterval: any;
  comisionEstimadaGFC: ComisionEstimadaInterface;
  productividadDiariaInterface: ProductividadDiariaInterface;
  productividadSemanalInterface: ProductividadSemanalInterface;
  onlyOnce: boolean = true;
  perfilId: number;


  // componentes hijos
  @ViewChild(NavBarComponent) navBarChild: NavBarComponent;
  @ViewChild(HeaderPizarronDigitalComponent) headerPizarronDigitalChild: HeaderPizarronDigitalComponent;
  @ViewChild(ControlProductividadComponent) ControlProductividadChild: ControlProductividadComponent;
  @ViewChild(ComisionBonoPdComponent) ComisionBonoPdChild: ComisionBonoPdComponent;
  @ViewChild(DetalleProductividadComponent) DetalleProductividadChild: DetalleProductividadComponent;

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
      this.gerencia = JSON.parse(localStorage.getItem('infoGerente'));
      console.log(this.gerencia);
      
      this.perfilId = +this.loginInterface.usuarioData.perfilUsuarioId;
      // Obtiene Nóminas
      this.nomina = +this.loginInterface.usuarioData.nomina;
      this.nominaGerente = +this.gerencia.nominaGerente;
      
      this.gerentesService.token = this.loginInterface.token;
      // cargamos el modo pantalla
      this.modoPantalla = JSON.parse(localStorage.getItem('modoPantalla'));
      this.navBarChild.perfilId = this.perfilId;
      this.navBarChild.nomina = this.nomina;
      // if (this.modoPantalla && this.modoPantalla.modoDetalle) {
      //   this.nomina = this.modoPantalla.nominaDetalle;
      // }
      this.loadDataOnlyOnce();
      const logSistema: LogSistemaInterface = {
        idAccion: 3,
        idPantalla: 4,
        usuario: this.loginInterface.usuarioData.nomina
      };
      this.registrarLogPantalla(logSistema);
      // Carga automática de componentes cada 20 segundos
      // this.idInterval = setInterval(() => this.loadData(), 60000);

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      this.registrarError(error.message);
    }
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

  recievePeriodo(cambioCarga: boolean): void{
    //control productividad emite un cambio
    if(cambioCarga){
      this.loadData();
    }else{
      this.DetalleProductividadChild.cambioProductividad(this.ControlProductividadChild.DiariaSemana, () => {});
    }

  }

  loadData(): void{
    try {
      console.log("loadData");
      if(this.ControlProductividadChild.DiariaSemana){
        //carga Diaria
        this.DetalleProductividadChild.loadData(this.nominaGerente,
          this.DetalleProductividadChild.productividadDiaria.resultAnioSemana.anio.toString(),
          this.DetalleProductividadChild.productividadDiaria.resultAnioSemana.semanaAnio.toString(),
          '0',
          this.DetalleProductividadChild.productividadDiaria.resultAnioSemana.fechaCorte,
          this.ControlProductividadChild.anteriorPosterior,
          this.ControlProductividadChild.DiariaSemana , () =>{});
          
      }else{
        //carga Semana
        this.DetalleProductividadChild.loadData(this.nominaGerente,
          this.DetalleProductividadChild.ProductividadSemanal.resultTotal.anio.toString(),
          '0',
          this.DetalleProductividadChild.ProductividadSemanal.resultTotal.tetrasemanaAnio.toString(),
          this.DetalleProductividadChild.ProductividadSemanal.resultTotal.fechaCorte,
          this.ControlProductividadChild.anteriorPosterior,
          // false,
          this.ControlProductividadChild.DiariaSemana, () =>{})
          
      }

    } catch (error) {
      this.toastrService.error(error.message, 'Aviso');
      // this.registrarError(error.message);
    }
  }

  loadDataOnlyOnce(): void{
    try {
      const fecha ='1900-01-01';
      console.log(fecha);      
      this.headerPizarronDigitalChild.loadData(this.gerencia);
      this.DetalleProductividadChild.loadData(this.nominaGerente,'0','0','0',fecha,false,true, () => {this.ComisionBonoPdChild.loadData(this.nominaGerente, new Date().toISOString())});
      this.DetalleProductividadChild.loadData(this.nominaGerente,'0','0','0',fecha,false,false, () => {});
      
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
