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

  getDashboardLink(): string {
    // Assuming you have a method to get the user's role, like login.getUserRole()
    const userRole = this.getUserRole();
  
    // Set the appropriate route based on the user's role
    if (userRole === 'ROLE_ADMIN') {
      return '/admin-dashboard';
    } else if (userRole === 'ROLE_USER') {
      // Modify this line to fit the actual route for user components
      return 'user-dashboard/0';
    }
  
    // Default route if the user role is not recognized
    return '/default-dashboard';
  }
  
  getUserRole(): any {
    // Retrieve the stored data from local storage
    const storageDataString = localStorage.getItem('user');
  
    if (storageDataString) {
      // Parse the JSON string to get the user data
      const userData = JSON.parse(storageDataString);
  
      // Check if user data is present and has the authorities array
      if (userData && userData.userWithAuthorities && userData.userWithAuthorities.authorities) {
        // Get the user role from the authorities array
        const userRole = userData.userWithAuthorities.authorities[0]; // Assuming the role is the first element in the array
  
        return userRole;
      } else {
        console.error('Invalid user data format in local storage.');
      }
    } else {
      console.error('User data not found in local storage.');
    }
  }
  
  
}
