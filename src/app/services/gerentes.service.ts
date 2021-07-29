import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GerentesService {
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

  public getPlantilla(nomina: string): any {
    return this.http.get(this.apiURL +
      `Gestion/getPromotores/${nomina}`);
  }
  public getHeader(nomina: string): any {
    return this.http.get(this.apiURL +
      `Gestion/GetHeader/${nomina}`);
  }

  public getProductividadDiaria(nomina: string, Anio: string , SemanaAnio: string, FechaCorte: string, EsPosterior: boolean): any {
    return this.http.get(this.apiURL +
      `Gestion/GetProductividadDiaria/${nomina}/${Anio}/${SemanaAnio}/${FechaCorte}/${EsPosterior}`);
  }

  public getComisionEstimada(nomina: string, Fecha: string): any {
    return this.http.get(this.apiURL +
      `Gestion/GetComisionEstimada/${nomina}/${Fecha}`);
  }

  public getProductividadSemanal(nomina: string, Anio: string , TetrasemanaAnio: string, FechaCorte: string, EsPosterior: boolean): any {
    return this.http.get(this.apiURL +
      `Gestion/GetProductividadSemanal/${nomina}/${Anio}/${TetrasemanaAnio}/${FechaCorte}/${EsPosterior}`);
  }

}
