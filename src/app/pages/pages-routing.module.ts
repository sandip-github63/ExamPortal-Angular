import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminGuard } from '../services/admin.guard';
import { UserGuard } from '../services/user.guard';
import { MainContentComponent } from './admin/content/main-content/main-content.component';
import { WelcomeComponent } from './admin/content/welcome/welcome.component';
import { ViewCategoriesComponent } from './admin/content/view-categories/view-categories.component';
import { AddCategoryComponent } from './admin/content/add-category/add-category.component';
import { ViewQuizzesComponent } from './admin/content/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './admin/content/add-quiz/add-quiz.component';
import { LoginComponent } from '../auth/login/login.component';
import { UpdateQuizComponent } from './admin/content/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './admin/content/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './admin/content/add-question/add-question.component';
import { ViewQuizComponent } from './user/content/view-quiz/view-quiz.component';
import { QuizDetailsComponent } from './user/content/quiz-details/quiz-details.component';
import { StartQuizComponent } from './user/content/start-quiz/start-quiz.component';
import { RegisterUserComponent } from './admin/content/register-user/register-user.component';
import { ViewAllUsersComponent } from './admin/content/view-all-users/view-all-users.component';
import { ViewRoleComponent } from './admin/content/view-role/view-role.component';
import { WelcomeChildComponent } from './admin/content/welcome-child/welcome-child.component';
import { ViewResultDetailsComponent } from './user/content/view-result-details/view-result-details.component';
import { UpdateQuizQuestionComponent } from './admin/content/update-quiz-question/update-quiz-question.component';
import { UpdateCategoryComponent } from './admin/content/update-category/update-category.component';


const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },

  {
    path:'admin-dashboard',
    component:DashboardComponent,
   
    canActivate:[AdminGuard] ,//activate admin guard to this route 
    children:[
        {
          path:"",
          component:WelcomeComponent

        },
        {
          path:"profile",
          component:MainContentComponent
        },
        {
          path:"categories",
          component:ViewCategoriesComponent
        },
        
        {
          path:"add-category",
          component:AddCategoryComponent
        },
        {
          path:"view-quizzes",
          component:ViewQuizzesComponent
        },
        {
          path:"add-quiz",
          component:AddQuizComponent
        },
        {
          path:"quiz-update/:quizId",
          component:UpdateQuizComponent

        },

        {
          path:"view-questions/:quizId/:title",
          component:ViewQuizQuestionsComponent
        },
        {
          path:"add-question/:quizId/:title",
          component:AddQuestionComponent
        },
        {
          path:"add-new-user",
          component:RegisterUserComponent
        },
        {
          path:"view-all-users",
          component:ViewAllUsersComponent
        },

        {
          path:"view-role/:userId/:firstName",
          component:ViewRoleComponent
        },

        {
          path:"welcome-child",
          component:WelcomeChildComponent
        },

        {
          path:"update-quiz-question/:quesId",
          component:UpdateQuizQuestionComponent
        },
        {
          path:"update-category/:cId",
          component:UpdateCategoryComponent
        }


    ]
    
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[UserGuard], //activate user guard to this route
    children:[
      
      {
        path:"app-view-result-details",
        component:ViewResultDetailsComponent
      },     

      {
        path:"quiz-details/:quizId",
        component:QuizDetailsComponent

      },  

      {
        path:":cId",
        component:ViewQuizComponent

      },   

    ]
    
  },

  {
    path:"start-quiz/:quizId",
    component:StartQuizComponent,
    canActivate:[UserGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
