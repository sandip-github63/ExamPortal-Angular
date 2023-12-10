import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [

    {
      path:"signup",
      component:SignupComponent

    },

    {
      path:"login",
      component:LoginComponent

    },

    {
      path:"reset",
      component:ResetComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
