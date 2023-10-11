import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quizId=0;
  
  quiz:any;

  categories:any;


  

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoriesService) { }

  ngOnInit(): void {

     this.quizId=this._route.snapshot.params.quizId; //get quizId from uri

    
     this._quiz.getQuizByQuizId(this.quizId).subscribe(

           (data:any)=>{

              this.quiz=data;
              

              console.log(this.quiz);


           },
           (error:any)=>{

            console.log("error !! :"+error);

           }


     );


     this._cat.categories().subscribe(
      
      (data:any)=>{

             this.categories=data;
       },

     (error:any)=>{

       alert("error in loading category");

     }
     
     );

  }

  public onSubmit(){

    this._quiz.updateQuiz(this.quiz).subscribe(
       (data)=>{
         
          Swal.fire("Success","Updated successfully ",'success');

       },
       (error)=>{

        Swal.fire("Error ..!!","Quiz not Updated",error);
        console.log("error...!!!!! "+error);

       }
    )     

  }

}
