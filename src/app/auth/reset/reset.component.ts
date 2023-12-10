import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;

  EmailId:any={
     email:""
  };

  emailandOTP:any={
     email:"",
     otp:""
  };

  isShowEmail:boolean=true;

  isShowPassword:boolean=false;

  passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder,private _reset:ResetService) {

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]  ,
      otp: [''] ,
      newpassword: ['']  ,
      confirmpassword: ['']  
    });
    

   }

   get email() {
    return this.resetForm.get('email');
  }


  ngOnInit(): void {

   

  }

  onSubmitEmail() {
    if (this.resetForm.valid) {
      // Implement your password reset logic here

      const enteredEmail = this.resetForm.value.email;

      alert(enteredEmail)

      this.EmailId.email=enteredEmail;

      this._reset.generateOTP(this.EmailId).subscribe(
        (data)=>{
             this.isShowEmail=false;
             alert("OTP send successfully")
        },
        (error)=>{
          console.log("OTP ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr..............")
          console.log(error);
        }
      );

    } else {
      // Mark the form and controls as touched to display validation messages
      this.resetForm.markAllAsTouched();
    }
  }



  public onSubmitOTP(){

    const enteredOTP = this.resetForm.get('otp')?.value;
    this.emailandOTP.email=this.EmailId.email;
    this.emailandOTP.otp=enteredOTP;

    this._reset.validateOTP(this.emailandOTP).subscribe(
      (data)=>{
          this.isShowPassword=true;
          alert("OTP validate successfully")
      },
      (error)=>{

          alert("Please enter valid otp")
          console.log(error);
      }
    );   

  }


  public showEmail(){
     this.isShowEmail=true;
  }


  public changePassword(){

    alert("change password is working");
    //rest of code to change the password

  }


  togglePasswordVisibility() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }
  

}
