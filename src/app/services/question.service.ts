import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionOfQuiz(quizId:any){

    return this.http.get(`${endPoint}/question/quiz/${quizId}`);

  }

  public addNewQuestion(question:any){

    return this.http.post(`${endPoint}/question/`,question);


  }


  public deleteSingleQuestion(quesId:any){

    return this.http.delete(`${endPoint}/question/${quesId}`);

  }
  

}
