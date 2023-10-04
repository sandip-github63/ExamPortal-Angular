import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeButton: string = 'home'; // Default active button is 'home'

  constructor(public login:LoginService, private router:Router) { }

  ngOnInit(): void {

      //get username from user

     
  }


  public logout(){

    this.login.logOut();
    
    this.router.navigate(['login']); 

  }


  setActive(button: string): void {
     
    this.activeButton = button;
  }

  
}
