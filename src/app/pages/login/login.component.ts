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

        if (this.loginInterface.usuarioAutorizado) {
          // this.loginService.setUserLoggedIn(this.loginInterface);

          // revisamos el estatus del usuario
          if (this.loginInterface.activo) {
            // this.loginService.setModuloActual(modulo);
            this.alertService.success('Bienvenido', this.options);
            this.router.navigate(['/home']);
          }
          else{
            this.alertService.error('Usuario inactivo, favor de contactar a ATI.', this.options);
          }

        } else {
          this.alertService.error('Clave y/o usuario incorrecto. Favor de revisar e intentar de nuevo', this.options);
        }
      })
      .catch( error =>
        {
          this.alertService.error(error , this.options );
          // throw error;
        });
    }

}
