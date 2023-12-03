import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interface/User.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

   public user:any;  
    
  // Create a FormGroup to hold all form controls
  signupForm: FormGroup|any;


  constructor(private userService:UserService, private formBuilder: FormBuilder) { }

  

  ngOnInit(): void {

    this.user={
      userName:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      role: ''
    }

    // Initialize the form controls and validation rules
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role : ''
    });
   
  }

  formSubmit(){
    
    // Check if the form is valid before submitting

    
    if(this.user.userName.trim()== '' || this.user.userName.trim()==null || this.user.password.trim()== '' || this.user.password.trim()==null){


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

  }
   
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
        
        console.log(error);

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
