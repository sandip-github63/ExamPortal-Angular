import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any|null=[];

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {


    this.quiz.Quizzes().subscribe(
      (data)=>{
        this.quizzes=data;

      },
      (error)=>{
        console.log("error ...."+error);
        Swal.fire("Error !!","Error ",error);

      }
    )

  }


  deleteQuizById(qId:any){

    Swal.fire({
      title: 'Are you sure want to delete ?',
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

        this.quiz.deleteQuizById(qId).subscribe(
          (data:any)=>{

           
            Swal.fire("Success ","Quiz is deleted successfully ",'success');

            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.quizId !=qId);
   
             
   
          },
   
          (error:any)=>{
   
           Swal.fire("Error!!.. ","Something went wrong",error);
           
           console.log("error... "+error);
             
   
              
          }
   
       );

      } else if (result.isDenied) {
        Swal.fire('Quize is not deleted..', '', 'info')
      }
    })   

  } 

}
