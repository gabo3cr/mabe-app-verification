import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface FormPage {
  clave: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  tokenLogin = 'jwt';

  url = environment.loginUrl;

  constructor(private http: HttpClient, private router: Router) { }

  public readToken(): string {
    return localStorage.getItem('jwt');
  }

  public removeItems() {
    localStorage.removeItem('jwt');
  }

  setToken(value: string) {
    localStorage.setItem('jwt', value);
  }

  isLoggedIn = (): boolean => this.readToken() ? true : false;

  public verificarPassword(obj: FormPage) {
    return this.http.post<any>(this.url + `auth/`, obj);
  }

  checkPassword(obj: FormPage) {
    return this.http.post<any>(this.url + `auth/`, obj);

  }

  loginIn(obj: FormPage, sessionId: string): Observable<any> {
    const body = { ...obj, session_id: sessionId };
    return this.http.post<any>(this.url + 'auth/', body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Error del cliente:', error.error.message);
    } else {
      // El servidor respondió con un código HTTP diferente de 200
      console.error(
        `El servidor retornó un código ${error.status}, ` +
        `body: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error
    return throwError(
      'Ocurrió un error, por favor intente nuevamente más tarde.');
  }

}
