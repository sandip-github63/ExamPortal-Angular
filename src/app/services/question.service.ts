import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import endPoint from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  //this api get all question of any quiz 
  //and it is commonly use in admin side
  public getQuestionOfQuiz(quizId:any){

    return this.http.get(`${endPoint}/question/quiz/all/${quizId}`);

  }

  //this api show only that number of question that is assigned to particular quiz
  // suppose  science quiz has 10 number of question assign then it will only show 10 question not more than 10 ie 11,12,13,..
  //this api is use for user 
  public getQuestionOfQuizWithLimit(quizId:any){

    return this.http.get(`${endPoint}/question/quiz/${quizId}`);

  }



  public addNewQuestion(question:any){

    return this.http.post(`${endPoint}/question/`,question);


  }


  public deleteSingleQuestion(quesId:any){

    return this.http.delete(`${endPoint}/question/${quesId}`);

  }

  public calculateQuiz(questions:any){

    return this.http.post(`${endPoint}/question/calculate-quiz`,questions);

  }

  public getAnswerOfQuestions(questions:any[]){

    return this.http.post(`${endPoint}/question/get-answer`,questions);
     
  }


  public getQuestion(quesId:any){

    return this.http.get(`${endPoint}/question/${quesId}`);

  }  


  public updateQuestion(question:any){
    return this.http.put(`${endPoint}/question/`,question);

  }

}
