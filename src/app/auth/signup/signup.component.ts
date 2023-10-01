import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Interface/User.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  public user:User={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  // Create a FormGroup to hold all form controls
  signupForm: FormGroup|any;


  constructor(private userService:UserService, private formBuilder: FormBuilder) { }

  

  ngOnInit(): void {
    // Initialize the form controls and validation rules
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
   
  }

  formSubmit(){

    // Check if the form is valid before submitting

    Swal.fire({
      icon: 'error',
      title: 'Form Validation Error',
      text: 'Please fill all required details before submit.',
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
    
    this.userService.addUser(this.user).subscribe(
      (data)=>{       

          // Show SweetAlert notification on success
          Swal.fire({
            icon: 'success',
            title: 'User Created!',
            text: 'The user has been created successfully.',
            timer: 3000, // Duration for the alert to automatically close (3 seconds in this example)
            showConfirmButton: false, // Disable the "OK" button
            position: 'top-end',            
            width: '300px',
            padding: '0.5rem',
            background: '#f8f9fa', 
            customClass: {

              title:'my-custom-title-class',           
              popup: 'my-sweetalert-popup'
           
            }


          });
      },
      (error)=>{    
        
        //error when invalid username

        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'user already exits..',
          timer: 3000, // Duration for the alert to automatically close (3 seconds in this example)
          showConfirmButton: false, // Disable the "OK" button
          position: 'top-end',            
            width: '300px',
            padding: '0.5rem',
            background: '#f8f9fa', 
            customClass: {
              title:'my-custom-title-class',           
              popup: ``           
            }

        });
        
        
      }
    );

  }   
}



