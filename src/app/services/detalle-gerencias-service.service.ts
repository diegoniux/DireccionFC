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

  public getBarraMetas(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getBarraMetas/69407/2021-04-01T00:00:00/2021-04-30T00:00:00/2');
  }

  public getMejorSaldo(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string, periodosPrevios: number): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + `DetalleGerencias/getMejorSaldo/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}/${periodosPrevios}`);
  }

  public getRelevantes(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + `DetalleGerencias/getRelevantes/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getTendencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + `DetalleGerencias/getTendencias/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  // Función para obtener las fechas dado un periodo
  public getFechasPeriodos(mesSemanaPrevios: number, idTipoPeriodo: number): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(`${this.infoApp.apiUrl}DetalleGerencias/getFechasPeriodo/${mesSemanaPrevios}/${idTipoPeriodo}`);
  }

  public getReporteGerencias(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getReporteGerencias/69407/2021-04-01T13:45:30/2021-04-30T13:45:30/2');
  }

}
