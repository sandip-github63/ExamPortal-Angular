import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz-question',
  templateUrl: './update-quiz-question.component.html',
  styleUrls: ['./update-quiz-question.component.css']
})
export class UpdateQuizQuestionComponent implements OnInit {

  quesId: any;

  question: any = {
    quesId: null,
    content: "",
    image: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    givenAnswer: null,
    quiz: {
      quizId: null,
      title: "",
      description: "",
      maxMarks: null,
      numberOfQuestions: null,
      active: null,
      category: {
        cId: null,
        title: "",
        discription: ""
      }
    }
  };

  constructor(private _route: ActivatedRoute, private _question: QuestionService,private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;

    this._question.getQuestion(this.quesId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {

          console.log(error);
      }
    );
  }

  public onSubmit() {
    // Validate data

    if (this.question.content.trim() == "" || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == "" || this.question.option1 == null) {
      return;
    }

    if (this.question.option2.trim() == "" || this.question.option2 == null) {
      return;
    }

    if (this.question.option3.trim() == "" || this.question.option3 == null) {
      return;
    }

    if (this.question.option4.trim() == "" || this.question.option4 == null) {
      return;
    }

    if (this.question.answer.trim() == "" || this.question.answer == null) {
      return;
    }

    // Question update code...

    this._question.updateQuestion(this.question).subscribe(
       (data)=>{
        this.openSnackBar('Question is Updated', 'Dismiss');

       },
       (error)=>{
           console.log("Error during updateQuestion");
           console.log(error)
       }
    );

     


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Set the duration in milliseconds

      
    });
  }
  
}
