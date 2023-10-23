import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  public getRoleOfUser(userId:any){

    return this.http.get(`${endPoint}/user/role/+${userId}`); 

  }
  //update role 

  public updateRoleOfUser(role:any){

    return this.http.put(`${endPoint}/user/role`,role);
  }


}
