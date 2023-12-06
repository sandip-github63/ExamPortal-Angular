import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  quizId: any;
  questions: any;

  marksGot: any = 0;
  correctAnswer: any = 0;
  attempted = 0;

  isSubmitted = false;

  // Timer variables
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  timer: any;
  timePerQuestion: any = 1;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute,private router: Router, private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this._route.snapshot.params.quizId;
    this.loadAllQuestions();

    // Set flag when quiz starts
   sessionStorage.setItem('quizStarted', 'true');

   document.addEventListener('visibilitychange', this.handleVisibilityChange);


  }


  handleVisibilityChange = () => {
    // Check visibility state and show a warning or take appropriate action
    if (document.visibilityState === 'hidden') {
      this.timerSubmit();
    }
  } 

  public loadAllQuestions() {
    this._question.getQuestionOfQuizWithLimit(this.quizId).subscribe(
      (data: any) => {
        console.log("all question of user ..." + data);
        this.questions = data;

        // Calculate timer, let one question can take 1 minute
        this.timer = this.questions.length * this.timePerQuestion * 60; // Convert to seconds

        this.value = (this.timer / (this.questions.length * this.timePerQuestion * 60)) * 100;

        // Add one key on the answer object so that we can get the correct answer there.

        console.log("questions after key.........." + this.questions);
        this.startTimer();
      },
      (error: any) => {
        console.log("Error while loading all questions for the user.." + error);
        Swal.fire("Error...", "While loading all questions of the user", error);
      }
    );
  }

  public preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    });
  }


  


  public submitQuiz() {
    Swal.fire({
      title: 'Are you sure to submit the Quiz?',
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
    
        this.calculateQuizByServer();

        //question list send to the route app-view-result-details/:quizId

      } else if (result.isDenied) {
        Swal.fire('Quiz has not started..', '', 'info');
      }
    });
  }

  public startTimer() {
    let t = window.setInterval(() => {
      // This block will be executed every second
      if (this.timer <= 0) {
        this.timerSubmit();
        clearInterval(t);
        return;
      } else {
        // Condition: timer = value always, so if the timer decreases, then decrease only that amount of value to make the condition true
        let currentValue = this.value / this.timer;
        this.value = this.value - currentValue;
        this.timer--;
      }
    }, 1000); // 1000 milliseconds equal to 1 second
  }

  getFormattedTimer() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }


  public calculateQuizByServer(){


    this.isSubmitted = true;

    this._question.calculateQuiz(this.questions).subscribe(

      (data:any)=>{

        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
      },
      (error:any)=>{
       
         
           console.log("Error..............."+error);

      }
    );

  }

  public timerSubmit() {
    this.calculateQuizByServer();
  
  }


  public printPDF(){
     window.print();
  }


  redirectToComponent(){
    this.navigateToTargetComponent();
  }

  navigateToTargetComponent() {
    this.router.navigate(['/user-dashboard/app-view-result-details'], {
      state: { myquestions: JSON.stringify(this.questions)}
    });
  }
  
}

