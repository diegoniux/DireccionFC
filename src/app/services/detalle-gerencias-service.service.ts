import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleGerenciasServiceService {
  infoApp: InfoAppInterface;
  constructor(public http: HttpClient, private loginService: LoginService){ }

  // Función para obtener los tipos periodo
  public getTiposPeriodos(): any {
    this.infoApp = this.loginService.getInfoApp();
    return this.http.get(this.infoApp.apiUrl + 'DetalleGerencias/getTiposPeriodo');
  }

}
