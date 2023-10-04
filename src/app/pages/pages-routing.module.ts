import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminGuard } from '../services/admin.guard';
import { UserGuard } from '../services/user.guard';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },
  {
    path:'admin-dashboard',
    component:DashboardComponent,
    pathMatch:"full",
    canActivate:[AdminGuard] //activate admin guard to this route 
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
