import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Interface/User.interface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


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

  
  constructor(private userService:UserService, private formBuilder: FormBuilder,private router: Router,private loginService:LoginService) { }


  ngOnInit(): void {
     // Initialize the form controls and validation rules
     this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
     
    });
  }

  formSubmit(){

    console.log("login is calling.....");


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
    
    this.loginService.generateToken(this.user).subscribe(
      (data:any)=>{       

            console.log("token is generated successfully...."+data);
           // Convert the object to a JSON string and log it
              const jsonData:any = JSON.stringify(data);

              // Parse the JSON string into an object
               const parsedData = JSON.parse(jsonData);

               console.log("parsedData having..."+parsedData);


               console.log(parsedData.token);

               
              console.log("token after generate :"+parsedData.token);

              this.loginService.setTokenLocalStorage(parsedData.token);

              console.log("check token is...."+this.loginService.getToken());


              this.loginService.getCurrentLoginUser().subscribe(
                    (user:any)=>{

                      this.loginService.setUser(user);

                      console.log("user data  "+user);

                      
                      if(this.loginService.getUserRole()=="ROLE_ADMIN"){

                        //redirect  admin dashboard
                        window.location.href='/admin-dashboard'

                      }else if (this.loginService.getUserRole()=="ROLE_USER"){

                         //redirect normal dashboard
                         window.location.href='/user-dashboard/0'


                      }else{
                          console.log("i am removing token.....");
                          this.loginService.logOut();


                      }


                     

                    },

                    (error:any)=>{

                       const jsonData:any = JSON.stringify(error);

                       // Parse the JSON string into an object
                        const pd = JSON.parse(jsonData);

                       console.log("Error !"+pd);


                    }

              );



          // Show SweetAlert notification on success
          Swal.fire({
            icon: 'success',
            title: 'User Created!',
            text: 'Token generated successfully.',
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

              const jsonData = JSON.stringify(error);
              
              console.log("Response data:", jsonData);


        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'invalid username or password',
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


  signupPage(){
    //redirect signup page
    this.router.navigate(['/signup']);
  }

}
