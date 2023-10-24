import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any|null=[];

  public filteredQuiz: any; 

  //pagination 

  pageSize:any=2;

  currentPage = 0;

  pageSizeOp=[1, 2, 3, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator| any;


  constructor(private quiz:QuizService) { }

  ngOnInit(): void {


    this.quiz.Quizzes().subscribe(
      (data)=>{
        this.quizzes=data;
        this.filteredQuiz=this.quizzes;
        

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


  public filterQuizzes(searchValue: string) {
     
    if (!searchValue) {
      // If the search input is empty, show all users
      this.filteredQuiz = this.quizzes;
    } else {
      // Filter the users based on the search input
      this.filteredQuiz = this.quizzes.filter((quiz: any) => {
        // You can customize the search logic based on your requirements
        return (
          quiz.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          quiz.category.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
  }



  // Add a function to handle page change
  onPageChange(event:any) {

    this.pageSize = event.pageSize; 

    this.currentPage = event.pageIndex;

    this.paginator.pageIndex = this.currentPage;

  
  }

  get pagedUsers() {
    
    const startIndex = this.currentPage * this.pageSize;

    return this.filteredQuiz.slice(startIndex, startIndex + this.pageSize);
  }


}
