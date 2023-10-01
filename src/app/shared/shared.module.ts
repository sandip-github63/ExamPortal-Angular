import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    
    

  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
