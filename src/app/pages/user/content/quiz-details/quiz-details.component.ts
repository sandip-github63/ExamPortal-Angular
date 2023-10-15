import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {

  quizId:any;

  quiz:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) {
      
      
     
   }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizId;

     this._quiz.getQuizByQuizId(this.quizId).subscribe(
       (data:any)=>{

          

          this.quiz=data;

        

       },

       (error:any)=>{

        console.log("Error ...."+error);
         
       }
     );
    

  }


  roundMaxMarksPerQuestion() {
    // Calculate and round the value
    return Math.round(this.quiz.maxMarks / this.quiz.numberOfQuestions);
  }

  public startQuiz(){

   // [routerLink]="'/start-quiz/'+quiz.quizId"

   Swal.fire({
    title: 'Are you sure want to Start Quiz ?',
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

         // Swal.fire("Success ","Quiz started successfully..",'success');

         this._router.navigate(['/start-quiz/'+this.quizId]);
          

    } else if (result.isDenied) {
      Swal.fire('Quiz is not started..', '', 'info')
    }
  })  

 }

}
