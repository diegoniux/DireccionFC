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
      `Gestion/getPromotores/${nomina}`);
  } 
}
