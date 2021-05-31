import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleLiderComercialService {
  token: string;
  infoApp: InfoAppInterface;
  apiURL: string;

  constructor(public http: HttpClient, private loginService: LoginService) {
    this.infoApp = this.getInfoApp();
    this.apiURL = this.infoApp.apiUrl;
   }

   private getInfoApp(): InfoAppInterface
   {
     return this.loginService.getInfoApp();
   }

   public getDetalleGerencia(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getDetalleGerencia/${nomina}`);
  }

  public getComisionEstimada(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string, periodosPrevios: number): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getComisionEstimada/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getEspecialistasRiesgo(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getEspecialistasRiesgo/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getAvance(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getAvance/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getNotificaciones(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getNotificaciones/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getRelevanteApps(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getRelevanteApps/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }
}
