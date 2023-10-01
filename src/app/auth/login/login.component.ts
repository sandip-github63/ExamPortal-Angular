import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Interface/User.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup|any;

 

  public user:User={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  
  constructor(private userService:UserService, private formBuilder: FormBuilder,private router: Router) { }


  ngOnInit(): void {
     // Initialize the form controls and validation rules
     this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
     
    });
  }



  formSubmit(){

    // Check if the form is valid before submitting

    Swal.fire({
      icon: 'error',
      title: 'Form Validation Error',
      text: 'please fill username and password before submit..',
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end',
      width: '300px',
      padding: '0.5rem',
      background: '#f8f9fa',
      customClass: {
        title: 'my-custom-title-class',
        popup: 'my-sweetalert-popup'
      }
    });
    return;
   
    // Continue with form submission logic   
   

  } 


  signupPage(){
    //redirect signup page
    this.router.navigate(['/signup']);
  }

}
