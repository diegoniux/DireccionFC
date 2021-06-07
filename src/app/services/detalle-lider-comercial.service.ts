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

   public getDetalleGerencia(nomina: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getDetalleGerencia/${nomina}`);
  }

  public getComisionEstimada(nomina: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getComisionEstimada/${nomina}`);
  }

  public getEspecialistasRiesgo(nomina: string, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getEspecialistasRiesgo/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getAvance(nomina: string, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getAvance/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getNotificaciones(nomina: string, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getNotificaciones/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getRelevanteApps(nomina: string, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DetalleLiderComercial/getRelevanteApps/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }
}
