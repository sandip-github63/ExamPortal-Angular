import { Location, LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-result-details',
  templateUrl: './view-result-details.component.html',
  styleUrls: ['./view-result-details.component.css']
})
export class ViewResultDetailsComponent implements OnInit {

  quizId: any;
  questions: any[]=[];
  
  marksGot: any = 0;
  correctAnswer: any = 0;
  attempted = 0;
  
  // Timer variables
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  timer: any;
  timePerQuestion: any = 1;
  data:any|null;
  storeData:any;

  isData:boolean=true;

  listOfQuesId:any={
     quesId:[]
  }

  answerOfQuestions:any={
      message:"",
      answer:{
          1:"",
          2:""
      }
  }

  answers:any;
  
  constructor(private route:Router,private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) {

     
    this.data=this.route.getCurrentNavigation()?.extras.state?.myquestions;
    //set data to browser localstorage because when use refresh the code then data lost
    //localstorage only save JSON data not javascript object so if its js object then serialize it on JSON
    
    if (this.data) {
      localStorage.setItem("myQuestions", this.data);
    }
  
    this.storeData = localStorage.getItem("myQuestions");
  
    if (this.storeData) {
      this.questions = JSON.parse(this.storeData);
    }

    if (this.questions.length === 0) {
      this.isData = false;
    }

  }
  
  ngOnInit(): void {      
    
     //filter quesId from questions then server hit for answer of particular question

     this.listOfQuesId.quesId=this.questions.map(question=>question.quesId);

     console.log(this.listOfQuesId);
     this._question.getAnswerOfQuestions(this.listOfQuesId).subscribe(
       (data)=>{
          this.answerOfQuestions=data;
          console.log(data)

          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          this.answers=this.answerOfQuestions.answer;

       },
       (error)=>{
          console.log("Error ....................."+error);
       }
     ); 


     this.preventBackButton();
     
     
         
  } 


     // In your component class
isRadioButtonDisabled(q: any, option: string): boolean {
  return q.givenAnswer !== option;
}

public preventBackButton() {
  history.pushState(null, '', location.href);
  this.locationSt.onPopState(() => {
    history.pushState(null, "", location.href);
  });
}




}


