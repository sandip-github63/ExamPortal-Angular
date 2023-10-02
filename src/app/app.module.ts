import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { TokenInterceptor } from './services/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    PagesModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
