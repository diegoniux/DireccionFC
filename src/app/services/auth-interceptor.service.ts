import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoginInterface } from '../interfaces/login.interface';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;
    // si la url es para un recurso local, enviamos la petición sin miedo al éxito.
    if (!req.url.includes('http')) {
      return next.handle(req);
    }

    const login: LoginInterface = JSON.parse(localStorage.getItem('sessionUser'));
    if (!login) {
      return next.handle(req);
    }

    const token: string = login.token;
    request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return throwError( err );
      })
    );
  }
}
