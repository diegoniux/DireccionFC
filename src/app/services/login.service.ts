import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  public login(usuario: string, password: string) {
    return this.http.post('https://spw.invercap.com.mx/spw_Api_GestionFC/api/Login', JSON.stringify(
        {
          Usuario: usuario,
          Password: password
        }
      ), { headers: {'Content-Type': 'application/json; charset=utf-8'}}
      );
  }
}


