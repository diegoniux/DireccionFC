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
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      passw: ['', Validators.required]
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
          this.alertService.error('Usiario inactivo.', this.options);
          return;
        }

        this.loginService.setUserLoggedIn(this.loginInterface);
        // this.loginService.setModuloActual(modulo);
        this.alertService.success('Bienvenido', this.options);
        this.router.navigate(['/home']);

        console.log(this.loginInterface);


      })
      .catch( error =>
        {
          console.log(error);
          this.alertService.error(error , this.options );
          // throw error;
        });
    }

}
