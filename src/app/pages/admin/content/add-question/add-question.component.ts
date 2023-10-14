import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizId:any;
  title:any;




  question:any={
         
    content :"",
    image:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
    option1:"",
    quiz:{
        quizId:0
     }

  };


  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
     
     this.quizId=this._route.snapshot.params.quizId;
     this.title=this._route.snapshot.params.title;

     this.question.quiz['quizId']=this.quizId;


         
  }

  public onSubmit(){


     //validate data

     if(this.question.content.trim()=="" ||this.question.content==null){

        return;
        
     }

     if(this.question.option1.trim()=="" ||this.question.option1==null){

      return;
      
     }

     if(this.question.option2.trim()=="" ||this.question.option2==null){

      return;
      
   }

   if(this.question.option3.trim()=="" ||this.question.option3==null){

    return;
    
   }

   
   if(this.question.option4.trim()=="" ||this.question.option4==null){

    return;
    
   }

   if(this.question.answer.trim()=="" ||this.question.answer==null){

      return;
    
   }




    this._question.addNewQuestion(this.question).subscribe(

      (data:any)=>{
          
        Swal.fire("Success..","Question Added successfully",'success');

        //Blank data of all Question filed

        this.question.content="";
        this.question.option1="";
        this.question.option2="";
        this.question.option3="";
        this.question.option4="";
          
      },
      (error)=>{

        Swal.fire("Error!!","Somthing went Wrong",error);
        console.log("Error !!! :"+error);
          
      }

    );
  }

}

