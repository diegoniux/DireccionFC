import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleGerenciasService {
  infoApp: InfoAppInterface;
  constructor(public http: HttpClient, private loginService: LoginService){ }

  // Función para obtener los tipos periodo
  public getTiposPeriodos(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getTiposPeriodo');
  }

  public getBerraMetas(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getBarraMetas/69407/2021-04-01T00:00:00/2021-04-30T00:00:00/2');
  }

}
