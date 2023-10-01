import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

// Add the following imports for Angular Material components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card'; // Add this line
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule

    
  ]
})
export class AuthModule { }
