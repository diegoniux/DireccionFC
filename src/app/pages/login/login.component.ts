import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginInterface } from '../../interfaces/login.interface';
import { AlertService } from 'src/app/shared/_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Anio: number = new Date().getFullYear();
  loginForm: FormGroup;
  loginInterface: LoginInterface;
  chkRecordarUsuario: boolean = true;

  submitted = false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private router: Router,
              public loginService: LoginService,
              private formBuilder: FormBuilder,
              public alertService: AlertService)
  {

  }

  ngOnInit(): void {
    let usr: string;
    usr = localStorage.getItem('usuario') != null ? localStorage.getItem('usuario') : '';
    console.log("usr: " + usr);

    this.loginForm = this.formBuilder.group({
      user: [usr, Validators.required],
      passw: ['', Validators.required],
      recordarUsr: [true]
    });
    this.chkRecordarUsuario = localStorage.getItem('usuario') != null ? true : false;

    //this.loginForm.setValue[2] = true;
    this.loginService.setUserLoggedOn();
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
        
        if(this.loginForm.value.recordarUsr)
          localStorage.setItem('usuario', this.loginForm.value.user);
        else if(localStorage.getItem('usuario') != null)
          localStorage.removeItem('usuario');

        this.loginService.setUserLoggedIn(this.loginInterface);
        // this.loginService.setModuloActual(modulo);
        this.alertService.success('Bienvenido', this.options);
        this.router.navigate(['/home']);

        console.log(this.loginInterface);


      })
      .catch( error =>
        {
          this.alertService.error(error.message , this.options );
          // throw error;
        });
    }
}
