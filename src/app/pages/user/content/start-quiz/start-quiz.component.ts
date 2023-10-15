import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizId:any;
  questions:any;

  marksGot:any=0;
  correctAnswer:any=0;
  attempted=0;

  isSubmitted=false;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId=this._route.snapshot.params.quizId;
    

    this.loadAllQuestions();


  }

  public loadAllQuestions(){

    this._question.getQuestionOfQuizWithLimit(this.quizId).subscribe(
        (data:any)=>{
          console.log("all question of user ..."+data);
          this.questions=data;

          //add one key on answer object so that we can get correct answer there.

          this.questions.forEach((q:any) => {

              q['givenAnswer']="";
            
          });

          console.log("questions after key.........."+this.questions);


        },
        (error:any)=>{
          console.log("Error while loading all questions for user .."+error);
          Swal.fire("Error...","While loading all questions of user",error);

        }
    );

  }

  public preventBackButton(){
    history.pushState(null,'', location.href);
    this.locationSt.onPopState(
       ()=>{
          history.pushState(null,"" , location.href);          
       }
    )
  }


  public submitQuiz(){

      
   Swal.fire({
    title: 'Are you sure to Submit the Quiz ?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    }
  }).then((result) => {
    if (result.isConfirmed) {

      //calculate

         this.isSubmitted=true;
         this.marksGot=0;
         this.correctAnswer=0;
         this.attempted=0;
      
      this.questions.forEach((q:any)=>{
 
          if(q.givenAnswer==q.answer){
            this.correctAnswer++;


          }

          if(q.givenAnswer.trim()!=''){
              //if givenAnswer is not blank then it seems user attempt the question
              this.attempted++;
          }
         
      })

      
      let marksPerQuestion=this.questions[0].quiz.maxMarks / this.questions.length;

      this.marksGot=this.correctAnswer*marksPerQuestion; 

 

    } else if (result.isDenied) {

      Swal.fire('Quiz is not started..', '', 'info');

    }
  })  

  }



}


