import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { LoginService } from './login.service';
import { RelevanteComponent } from '../shared/relevante/relevante.component';

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
  
  public getMejorSaldo(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getMejorSaldo/17608/1/2021-05-03T00:00:00/2021-05-09T00:00:00');
  }
  
  public getRelevantes(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getRelevantes/17608/1/2021-05-03T00:00:00/2021-05-09T00:00:00');
  }

  public getTendencias(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getTendencias/17608/1/2021-05-03T00:00:00/2021-05-09T00:00:00');
  }

    // Función para obtener las fechas dado un periodo
    public getFechasPeriodos(mesSemanaPrevios: number, idTipoPeriodo: number): any {
      this.infoApp = this.loginService.getInfoApp();
      return this.http.get(`${this.infoApp.apiUrl}DetalleGerencias/getFechasPeriodo/${mesSemanaPrevios}/${idTipoPeriodo}`);
    }
}
