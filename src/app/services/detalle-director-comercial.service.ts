import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleDirectorComercialService {
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

   public getPlantillaDireccionComercial(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DirectorComercial/getPlantillaDireccionComercial/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getEncabezadoZonaDireccionComercial(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DirectorComercial/getEncabezadoZonaDireccionComercial/${nomina}/${tipoPeriodo}/${fechaInicio}/${fechaFin}`);
  }

  public getHeaderDirectorComercial(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DirectorComercial/getHeaderDirectorComercial/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`);
  }

  public getDetalleDireccionComercial(nomina: number, tipoPeriodo: number, fechaInicio: string, fechaFin: string): any {
    return this.http.get(this.apiURL +
      `DirectorComercial/getDetalleDireccionComercial/${nomina}/${fechaInicio}/${fechaFin}/${tipoPeriodo}`);
  }
}
