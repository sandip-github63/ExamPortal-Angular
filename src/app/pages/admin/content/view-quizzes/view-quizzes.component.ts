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

  

}
