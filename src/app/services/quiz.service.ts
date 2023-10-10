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

}
