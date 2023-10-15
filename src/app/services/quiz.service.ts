import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public Quizzes(){
    return this.http.get(`${endPoint}/quiz/`); 
  }

  public addQuiz(quiz:any){

    return this.http.post(`${endPoint}/quiz/`,quiz); 

  }

  deleteQuizById(qId:any){

    return this.http.delete(`${endPoint}/quiz/${qId}`); 
   
  }

  //get Quiz by quizId

  public getQuizByQuizId(quizId:any){

    return this.http.get(`${endPoint}/quiz/${quizId}`); 

  }

  public updateQuiz(quiz:any){

    return this.http.put(`${endPoint}/quiz/`,quiz); 

  }

  public getQuizzesOfCategory(cId:any){

    return this.http.get(`${endPoint}/quiz/category/${cId}`);  
     
  }


  public getActiveQuizzes(){

    return this.http.get(`${endPoint}/quiz/active`);  


  }

  public getActiveQuizzesOfCategory(cId:any){

    return this.http.get(`${endPoint}/quiz/category/active/${cId}`);  

  }



}
