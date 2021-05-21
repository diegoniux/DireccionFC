import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { LoginService } from './login.service';
import { InfoAppService } from './info-app.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleGerenciasService {
  token: string;
  infoApp: InfoAppInterface;
  apiURL: string;

  constructor(public http: HttpClient, private loginService: LoginService)
  {
    this.infoApp = this.getInfoApp();
    this.apiURL = this.infoApp.apiUrl;
  }

  private getInfoApp(): InfoAppInterface
  {
    return this.loginService.getInfoApp();
  }

  // Función para obtener los tipos periodo
  public getTiposPeriodos(): any {
    return this.http.get(this.apiURL + 'DetalleGerencias/getTiposPeriodo');
  }

  public getBarraMetas(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleGerencias/getBarraMetas/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`);
  }

  public getMejorSaldo(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string, periodosPrevios: number): any {
    return this.http.get(this.apiURL +
      `DetalleGerencias/getMejorSaldo/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}/${periodosPrevios}`);
  }

  public getRelevantes(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleGerencias/getRelevantes/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getTendencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleGerencias/getTendencias/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  // Función para obtener las fechas dado un periodo
  public getFechasPeriodos(mesSemanaPrevios: number, idTipoPeriodo: number): any {
    return this.http.get(`${this.apiURL}DetalleGerencias/getFechasPeriodo/${mesSemanaPrevios}/${idTipoPeriodo}`);
  }

  public getReporteGerencias(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleGerencias/getReporteGerencias/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`);
  }

}
