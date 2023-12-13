import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  showManageUserList: boolean = false;

  //activeButton: string = 'home'; // Default active button is 'home'

  activeButton: string = ''; 
  constructor(private _login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  setActive(button: string): void {
     
    //this.activeButton = button;
  }

  logout(){

    this._login.logOut();
    
    this.router.navigate(['login']); 
     
  }

// Add this property to your component



}
