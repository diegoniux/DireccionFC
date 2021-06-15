import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { AlertService } from 'src/app/shared/_alert';
import { LogSistemaInterface } from '../../interfaces/logSistema.interface';
import { LogErrorInterface } from '../../interfaces/logError.interface';
import { InfoAppService } from '../../services/info-app.service';
import { InfoAppInterface } from '../../interfaces/infoApp.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Anio: number = new Date().getFullYear();
  loginForm: FormGroup;
  loginInterface: LoginInterface;

  submitted = false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private router: Router,
              public loginService: LoginService,
              private formBuilder: FormBuilder,
              public alertService: AlertService,
              private infoAppService: InfoAppService)
  {
    this.cargarInfoApp();
  }

  ngOnInit(): void {
    let usr: string;
    let chkRecordarUsuario: boolean;
    usr = localStorage.getItem('usuario') != null ? localStorage.getItem('usuario') : '';
    chkRecordarUsuario = localStorage.getItem('usuario') != null ? true : false;

    this.loginForm = this.formBuilder.group({
      user: [usr, Validators.required],
      passw: ['', Validators.required],
      recordarUsr: [chkRecordarUsuario]
    });
  }

  // función para obtener los controles del formulario
  get f(): any { return this.loginForm.controls; }

  public loginUsuario(): any {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.alertService.clear();

    this.loginService.login(this.loginForm.value.user, this.loginForm.value.passw)
      .toPromise()
      .then((resp: LoginInterface) => {

        this.loginInterface = resp;

        if (!this.loginInterface.resultadoEjecucion.ejecucionCorrecta) {
          this.alertService.error(this.loginInterface.resultadoEjecucion.errorMessage, this.options);
          return;
        }

        if (!this.loginInterface.usuarioData.activo) {
          this.alertService.error('Usuario inactivo.', this.options);
          return;
        }

        if (this.loginForm.value.recordarUsr) {
          localStorage.setItem('usuario', this.loginForm.value.user);
        } else
        if (localStorage.getItem('usuario') != null) {
          localStorage.removeItem('usuario');
        }

        this.loginService.setUserLoggedIn(this.loginInterface);

        const logSistema: LogSistemaInterface = {
          idAccion: 1,
          idPantalla: 0,
          usuario: this.loginInterface.usuarioData.nomina
        };

        this.loginService.setLogSistema(logSistema)
        .toPromise()
        .then((data: any) => {
        })
        .catch();

        
        this.alertService.success('Bienvenido', this.options);
        if(this.loginInterface.usuarioData.perfilUsuarioId == 9)
          this.router.navigate(['/home']);
        else
          this.router.navigate(['/home/detalleDirectorComercial']);
      })
      .catch( error =>
        {
          const logError: LogErrorInterface = {
            idPantalla: 0,
            usuario: 0,
            error: error.message
          };

          this.loginService.setLogError(logError);
          this.alertService.error(error.message , this.options );
          // throw error;
        });
    }

    private cargarInfoApp(): any
    {
      this.infoAppService.getInfoApp()
      .toPromise()
      .then( (resp: InfoAppInterface) => {
        localStorage.setItem('isUserLoggedIn', 'false');
        localStorage.setItem('infoApp', JSON.stringify(resp));
      })
      .catch( error => {
        this.alertService.error(error.message , this.options );
      });
    }
}
