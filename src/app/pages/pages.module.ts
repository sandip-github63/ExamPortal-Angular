import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './admin/content/sidebar/sidebar.component';

import { MainContentComponent } from './admin/content/main-content/main-content.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from './admin/content/welcome/welcome.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewCategoriesComponent } from './admin/content/view-categories/view-categories.component';
import { AddCategoryComponent } from './admin/content/add-category/add-category.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ViewQuizzesComponent } from './admin/content/view-quizzes/view-quizzes.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AddQuizComponent } from './admin/content/add-quiz/add-quiz.component';

import { MatCheckboxModule } from '@angular/material/checkbox'; // Import MatCheckboxModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'; // Import the ReactiveFormsModule
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UpdateQuizComponent } from './admin/content/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './admin/content/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './admin/content/add-question/add-question.component';
import { SidebarComponent as sidebarusercomponent } from './user/content/sidebar/sidebar.component';
import { ViewQuizComponent } from './user/content/view-quiz/view-quiz.component';
import { QuizDetailsComponent } from './user/content/quiz-details/quiz-details.component';
import { StartQuizComponent } from './user/content/start-quiz/start-quiz.component';

import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
   
    MainContentComponent,
        WelcomeComponent,
        ViewCategoriesComponent,
        AddCategoryComponent,
        ViewQuizzesComponent,
        AddQuizComponent,
        UpdateQuizComponent,
        ViewQuizQuestionsComponent,
        AddQuestionComponent,
        sidebarusercomponent,
        ViewQuizComponent,
        QuizDetailsComponent,
        StartQuizComponent     
        
    
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    FormsModule,
    BrowserModule,
    MatSnackBarModule,
    MatBadgeModule, 
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule  ,
    MatSlideToggleModule,
    MatRadioModule,   
   
      
    
  ]
})
export class PagesModule { }
