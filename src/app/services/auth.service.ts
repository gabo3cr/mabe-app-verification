import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface FormPage {
  clave: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //isLoggedIn: boolean = false;
  tokenLogin = 'jwt';


  url = environment.loginUrl;
  //url = "http://localhost/mabe-licencia/";  

  constructor(private http: HttpClient, private router: Router) { }

  public readToken(): string {
    return localStorage.getItem('jwt');
  }

  public removeItems(){
    localStorage.removeItem('jwt');   
  }

  setToken(value: string){
    localStorage.setItem('jwt', value);    
  }

  isLoggedIn = (): boolean => this.readToken() ? true : false;

  public verificarPassword(obj: FormPage) {
    return this.http.post<any>(this.url + `auth/`, obj);
  }

  public loginIn(obj: FormPage) {
    //this.tokenLogin;
    //console.log("aqui entra el guard: ", this.isLoggedIn)
    return this.http.post<any>(this.url + `auth/`, obj);
  }
}
