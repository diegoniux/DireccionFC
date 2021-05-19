import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuloInterface } from '../interfaces/modulo.interface';
import { LoginInterface } from '../interfaces/login.interface';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { InfoAppService } from './info-app.service';
import { LogSistemaInterface } from '../interfaces/logSistema.interface';
import { LogErrorInterface } from '../interfaces/logError.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  infoApp: InfoAppInterface;
  apiURL: string;

  constructor(public http: HttpClient, private infoAppService: InfoAppService)
  {
    this.infoAppService.getInfoApp()
    .toPromise()
    .then( (resp: InfoAppInterface) => {
      this.infoApp = resp;
      this.apiURL = this.infoApp.apiUrl;
    })
    .catch( error => {
      throw error;
    });
  }

  public login(usuario: string, password: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiURL + 'Login/LDAP', JSON.stringify(
        {
          Usuario: usuario,
          Password: password
        }
      ), httpOptions
      );
  }

  public setLogSistema(logSistema: LogSistemaInterface): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiURL + 'Login/LogSistema', JSON.stringify(logSistema), httpOptions);
  }

  public setLogError(logSistema: LogErrorInterface): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiURL + 'Login/LogSistema', JSON.stringify(logSistema), httpOptions);
  }

  public getInfoApp(): InfoAppInterface {
    let infoApp: InfoAppInterface;
    if (localStorage.getItem('infoApp') !== '') {
      infoApp = JSON.parse(localStorage.getItem('infoApp'));
    }
    return infoApp;
  }


  public setUserLoggedIn(login: LoginInterface): void {
    this.infoAppService.getInfoApp()
    .toPromise()
    .then( (resp: InfoAppInterface) => {
      localStorage.setItem('infoApp', JSON.stringify(resp));
    })
    .catch( error => {
      throw error;
    });

    localStorage.setItem('sessionUser', JSON.stringify(login));
    localStorage.setItem('isUserLoggedIn', 'true');
  }

  public getUserLoggedIn(): LoginInterface {
    let loginInterface: LoginInterface;
    if (localStorage.getItem('sessionUser') !== '') {
      loginInterface = JSON.parse(localStorage.getItem('sessionUser'));
    }
    return loginInterface;
  }

  public setUserLoggedOn(): void {
    localStorage.setItem('isUserLoggedIn', 'false');
    localStorage.setItem('moduloActual', null);
  }
}


