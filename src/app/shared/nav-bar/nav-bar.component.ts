import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { Router } from '@angular/router';
import { LoginInterface } from '../../interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() seccionActiva:number;
  perfilId: number;
  loginInterface: LoginInterface;
  nomina: number;

  constructor(private router: Router,
    private toastrService: ToastrService,
    public loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  public logOut(): any {
    if (confirm('¿Está seguro de cerrar sesión?')){
    this.loginService.setUserLoggedOn();
    const logSistema: LogSistemaInterface = {
      idAccion: 2,
      idPantalla: 0,
      usuario: this.nomina
    };
    this.registrarLogPantalla(logSistema);
    this.router.navigate(['/Login']);
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
}
