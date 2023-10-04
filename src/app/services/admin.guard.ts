import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
  constructor(private login:LoginService , private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       console.log("admin guard is calling..");
       
       console.log("isLoginedIn  ........"+ this.login.isLoginedIn() );

       console.log("getUserRole ............."+this.login.getUserRole());

     if(this.login.isLoginedIn() && this.login.getUserRole()=="ROLE_ADMIN"){
      

      return true;

     }
     //redirect user to login page

      this.router.navigate(['login']);     


     return false;
     

    
  }
  
}
