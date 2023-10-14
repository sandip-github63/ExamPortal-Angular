import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId:any;
  title:any;
  questions:any= [];

  constructor(private _route:ActivatedRoute,private _question:QuestionService, private _snack:MatSnackBar) { }

  ngOnInit(): void {

       this.quizId=this._route.snapshot.params.quizId;
       this.title=this._route.snapshot.params.title;

       console.log("quizId :"+this.quizId +"  title :"+this.title);

       //service call to hit server and get all questions of quiz

       this._question.getQuestionOfQuiz(this.quizId).subscribe(

         (data:any)=>{
             
         // Swal.fire("Done","Questions fetched.. ",'success');
          
         // this.questions=JSON.stringify(data, null, 2);

         this.questions=data;

          console.log("questions data  :"+this.questions);
          

         },
         (error:any)=>{
            

            Swal.fire("Error..!!","Something went wrong",error);
            console.log("Error during fetching Question of Quiz : "+error);

         }

       );
       

  }


   public deleteQuestionById(quesId:any){    
     
    Swal.fire({
      title: 'Are you sure you want to delete?',
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

        this._question.deleteSingleQuestion(quesId).subscribe(
          
           (data:any)=>{

              this._snack.open('Question is Deleted ','',{duration:3000})

              this.questions=this.questions.filter((q:any)=>q.quesId!=quesId);
              

           },
           (error:any)=>{

             console.log("error during deletion !! :"+error);
              
           }          

        );  
        
        
      } else if (result.isDenied) {
        // User clicked "No" (deny)
        Swal.fire('Cancelled', 'Your item is safe.', 'info');
      }
    });

    



  }

  public updateQuestionByQid(quesId:any){

  }



}