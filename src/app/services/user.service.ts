import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser;

  constructor() { }

  setUser(user: IUser){
    this.user = user;
  }

  getUser(): IUser{
    return this.user;
  }

  cleanUser(){
    this.user = null;
  }
}
