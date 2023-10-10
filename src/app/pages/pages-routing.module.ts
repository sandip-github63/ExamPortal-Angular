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
        }
    ]
    
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:"full",
    canActivate:[UserGuard] //activate user guard to this route
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
