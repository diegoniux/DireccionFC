import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LoginInterface } from '../../interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-director-comercial',
  templateUrl: './detalle-director-comercial.component.html',
  styleUrls: ['./detalle-director-comercial.component.css']
})
export class DetalleDirectorComercialComponent implements OnInit {


  nombreTitulo: string;
  nombreImg: string;
  loginInterface: LoginInterface;

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

  loadData(): void{
    try {
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

}
