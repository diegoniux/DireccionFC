import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoAppService {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

    constructor( private http: HttpClient) {
    }

    getInfoApp(): any {
        // leemos el archivo
        return this.http.get('assets/data/infoPage.json');
    }
}

