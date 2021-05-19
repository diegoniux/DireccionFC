import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleGerenciasService {
  token: string;
  infoApp: InfoAppInterface;

  constructor(public http: HttpClient, private loginService: LoginService){ }

  // Función para obtener los tipos periodo
  public getTiposPeriodos(): any {
    this.infoApp = this.loginService.getInfoApp();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getTiposPeriodo', httpOptions);
  }

  public getBarraMetas(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl +
      `DetalleGerencias/getBarraMetas/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`, httpOptions);
  }

  public getMejorSaldo(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string, periodosPrevios: number): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl +
      `DetalleGerencias/getMejorSaldo/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}/${periodosPrevios}`, httpOptions);
  }

  public getRelevantes(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl +
      `DetalleGerencias/getRelevantes/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`, httpOptions);
  }

  public getTendencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl +
      `DetalleGerencias/getTendencias/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`, httpOptions);
  }

  // Función para obtener las fechas dado un periodo
  public getFechasPeriodos(mesSemanaPrevios: number, idTipoPeriodo: number): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(`${this.infoApp.apiUrl}DetalleGerencias/getFechasPeriodo/${mesSemanaPrevios}/${idTipoPeriodo}`, httpOptions);
  }

  public getReporteGerencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.infoApp.apiUrl +
      `DetalleGerencias/getReporteGerencias/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`, httpOptions);
  }

}
