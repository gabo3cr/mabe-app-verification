import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { environment } from '../../environments/environment';
import { ICreateManualLog } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url = 'http://181.167.206.232:8081'; // {"username": "admin", "password": "zkteco1234"}
  //url = 'http://10.1.80.203:443/';
  url = environment.apiUrl;

  constructor(private http: HTTP) { }

  getToken() {
    
  const headers= { "Content-Type": "application/json" }

    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/api-token-auth/', {"username": "admin", "password": "Admin12345"}, headers)
        .then(response => {
          resolve(JSON.parse(response.data));
        }, (error) => {
          reject(error);
        });
    });
  }

  getUserInfo(data: string) {
    const headers = { "Content-Type": "application/json", "Authorization": `Token ${ localStorage.getItem('token') }` };
    const dataHandle = data.split('|');
    console.log("Parseo informacion tarjeta", dataHandle);
    return new Promise((resolve, reject) => {
      this.http.get(this.url + `/personnel/api/employee/?emp_code=${dataHandle[1]}`, {}, headers)
        .then(response => {
          resolve(JSON.parse(response.data));
        }, (error) => {
          reject(error);
        });
    });
  }

  savePunch(manualLog: ICreateManualLog) {
    const headers = { "Content-Type": "application/json", "Authorization": `Token ${ localStorage.getItem('token') }` };
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/att/api/manuallogs/', manualLog, headers)
        .then(response => {
          resolve(console.log(response)); 
        }, (error) => {
          reject(error);
        });
    });
  }
}
