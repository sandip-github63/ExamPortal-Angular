import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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


  //pagination 

  pageSize:any=2;

  currentPage = 0;

  pageSizeOp=[1, 2, 3, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

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
      title: 'Are you sure to delete?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-1 right-gap', // Changed order to 1
        cancelButton: 'order-2',             // Changed order to 2
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteSingleQuestion(quesId).subscribe(
          (data:any) => {
            this._snack.open('Question is Deleted ','',{duration:3000})
            this.questions = this.questions.filter((q:any) => q.quesId != quesId);
          },
          (error:any) => {
            console.log("error during deletion !! :" + error);
          }          
        );
      } 
    });
    



  }

  // Add a function to handle page change
  onPageChange(event:any) {

    this.pageSize = event.pageSize; 

    this.currentPage = event.pageIndex;

    this.paginator.pageIndex = this.currentPage;

  
  }

  get pagedUsers() {
    
    const startIndex = this.currentPage * this.pageSize;

    return this.questions.slice(startIndex, startIndex + this.pageSize);
  }



}
