import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  cId:any;

  quizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {   


     this._route.params.subscribe((params)=>{

      this.cId=params.cId;

      if(this.cId==0){
        //load all Quiz 
        console.log("load all quiz");

        //view only active quize

        this._quiz.getActiveQuizzes().subscribe(

          (data:any)=>{

             this.quizzes=data;       

            console.log(this.quizzes);
             
          },

          (error:any)=>{

            console.log("error "+error);
            alert("Error in loading all quizzes");
            
          }

        );

    }else{
        console.log("load particular quiz");

        this._quiz.getActiveQuizzesOfCategory(this.cId).subscribe(

          (data:any)=>{

            this.quizzes=data;

          },
          (error:any)=>{

            console.log("Error while loading Category of Quiz: "+error);

          }

        );


    }

     })  

  }

}
