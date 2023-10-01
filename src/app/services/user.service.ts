import { Injectable } from '@angular/core';
import { User } from '../Interface/User.interface';
import { HttpClient } from '@angular/common/http';
import baseURl from './helper';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //service to save user 

  public addUser(user:User){

    return this.http.post(`${endPoint}/user/`,user);


  }

}
