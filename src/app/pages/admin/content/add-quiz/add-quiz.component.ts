import { Component, OnInit } from '@angular/core';

import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';



@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
  
})
export class AddQuizComponent implements OnInit {

  categories=[
      {
        cId:'',
        title:""
      },
      {
        cId:'',
        title:""
      }
  ];

  quiz={

    title: '',
    description: '',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cId:''
    }


  };

  constructor(private cat:CategoriesService,private _snackBar: MatSnackBar,private quizservice:QuizService){

  }



  ngOnInit(): void {

    this.cat.categories().subscribe(
      (data:any)=>{
               
            this.categories=data;
            console.log(this.categories);

      },
      (error)=>{

        console.log("Error !!"+error);
        Swal.fire("Error!!",'error while',error);

      }
    )


  }



  addQuiz(){

    if(this.quiz.title.trim()=="" || this.quiz.title==null){

      this._snackBar.open("title is required !!","",{
        duration:3000
      })
      return ;

    
  }


  //call server 

  this.quizservice.addQuiz(this.quiz).subscribe(
     (data)=>{

           Swal.fire("Success ","Quiz is added successfully ",'success');
           console.log("data... "+data);

           this.quiz={

            title: '',
            description: '',
            maxMarks:'',
            numberOfQuestions:'',
            active:true,
            category:{
              cId:''
            }
        
        
          };
     },
     (error)=>{

      Swal.fire("Error ","Something went wrong",error);
      console.log("error...!!"+error);
          

     }

  );

 }

}
