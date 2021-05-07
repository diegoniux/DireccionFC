import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoAppInterface } from '../interfaces/infoApp.interface';
import { InfoAppService } from './info-app.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleGerenciasServiceService {
  infoApp: InfoAppInterface;
  apiURL: string;
  constructor(public http: HttpClient, private infoAppService: InfoAppService)
  {
    this.infoAppService.getInfoApp()
    .toPromise()
    .then( (resp: InfoAppInterface) => {
      this.infoApp = resp;
      this.apiURL = this.infoApp.API;
    })
    .catch( error => {
      throw error;
    });
  }

  // Función para obtener los tipos periodo
  public getTiposPeriodos(): any {
    return this.http.get(this.apiURL + 'Login/LDAP');
  }

}
