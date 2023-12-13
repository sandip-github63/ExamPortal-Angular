import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http:HttpClient) { }

  public categories(){

    return this.http.get(`${endPoint}/category/`);

  }

  public addCategory(category:any){

    return this.http.post(`${endPoint}/category/`,category);

  }


  public deleteCategoryByCid(cId:any){

    return  this.http.delete(`${endPoint}/category/${cId}`);

  }

  public getCategory(cId:any){
    return  this.http.get(`${endPoint}/category/${cId}`);
  }


}
