import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginInterface } from '../../interfaces/login.interface';
import { ReporteGerencia } from '../../interfaces/reporteGerencias.interface';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { HeaderPizarronDigitalComponent } from '../../shared/header-pizarron-digital/header-pizarron-digital.component';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { GerentesService } from '../../services/gerentes.service';
import { Router } from '@angular/router';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { RankingInterface } from '../../interfaces/dto/ranking.interface';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  nomina: number;
  nominaGerente:number;
  loginInterface: LoginInterface;
  infoGerencia: ReporteGerencia;
  idInterval: any;
  perfilId: number;
  rankingResp: RankingInterface

  @ViewChild(NavBarComponent) navBarChild: NavBarComponent;
  @ViewChild(HeaderPizarronDigitalComponent) headerPizarronDigitalChild: HeaderPizarronDigitalComponent;

  constructor(private router: Router,
    public service: GerentesService,
    public loginService: LoginService,
    private toastrService: ToastrService) {       
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
          idPantalla: 3,
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
    this.getRanking();
  }

  private getHeader(): any{
    if(!this.nominaGerente)
      return;
    this.headerPizarronDigitalChild.loadData(this.infoGerencia);
  }

  private getRanking(): any{
    // this.loading = true;
    // this.isLoadingEvent.emit(this.loading);
    this.service.GetRanking(this.nominaGerente.toString())
    .toPromise()
    .then((data: RankingInterface) =>{
      if (!data.resultadoEjecucion.ejecucionCorrecta) {
        throw new Error(data.resultadoEjecucion.friendlyMessage);
      }
      console.log(data);
      this.rankingResp = data;
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
      idPantalla: 3,
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
