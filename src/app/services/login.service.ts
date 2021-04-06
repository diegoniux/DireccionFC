import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuloInterface } from '../interfaces/modulo.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { InfoApp } from '../interfaces/infoApp.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  public login(usuario: string, password: string): any {
    return this.http.post('https://spw.invercap.com.mx/spw_Api_GestionFC/api/Login', JSON.stringify(
        {
          Usuario: usuario,
          Password: password
        }
      ), { headers: {'Content-Type': 'application/json; charset=utf-8'}}
      );
  }

  public getInfoApp(): InfoApp {
    let infoApp: InfoApp;
    if (localStorage.getItem('infoApp') !== '') {
      infoApp = JSON.parse(localStorage.getItem('infoApp'));
    }
    return infoApp;
  }

  public getModulos(IdAplicativo, IdPerfil): any {
    return this.http.get('https://localhost:44337/api/Login/Modulos/' + IdAplicativo + '/' + IdPerfil);
  }

  public getMenus(IdModulo, IdPerfil): any {
    return this.http.get('https://localhost:44337/api/Login/Menus/' + IdModulo + '/' + IdPerfil);
  }

  public getOpciones(IdMenu, IdPerfil): any {
    return this.http.get('https://localhost:44337/api/Login/Opciones/' + IdMenu + '/' + IdPerfil);
  }
  public getModuloActual(): ModuloInterface {
    let modulo: ModuloInterface;
    if (localStorage.getItem('moduloActual') !== '') {
      modulo = JSON.parse(localStorage.getItem('moduloActual'));
    }
    return modulo;
  }

  public getUserLoggedIn(): LoginInterface {
    let loginInterface: LoginInterface;
    if (localStorage.getItem('sessionUser') !== '') {
      loginInterface = JSON.parse(localStorage.getItem('sessionUser'));
    }
    return loginInterface;
  }

  public setUserLoggedOn(): void {
    localStorage.setItem('isUserLoggedIn', null);
    localStorage.setItem('moduloActual', null);
  }
}


