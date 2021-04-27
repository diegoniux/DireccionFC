import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuloInterface } from '../interfaces/modulo.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { InfoApp } from '../interfaces/infoApp.interface';
import { InfoAppService } from './info-app.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient,
              private infoAppService: InfoAppService) { }

  public login(usuario: string, password: string): any {

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        // 'withCredentials': 'false',
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://desaiis01/Api_DireccionFC/api/Login/LDAP', JSON.stringify(
        {
          Usuario: usuario,
          Password: password
        }
      ), httpOptions
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

  public setUserLoggedIn(login: LoginInterface): void {
    this.infoAppService.getInfoApp()
    .toPromise()
    .then( (resp: InfoApp) => {
      localStorage.setItem('infoApp', JSON.stringify(resp));
    })
    .catch( error => {
      throw error;
    });

    localStorage.setItem('sessionUser', JSON.stringify(login));
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


