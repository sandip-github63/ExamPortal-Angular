import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'; // Import your LoginService

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if a token is available in local storage
    let authReq=request;
    

    const token = this.loginService.getToken();

    console.log("interceptor token:"+token);

    console.log("interceptor called");

    // Clone the request and add an Authorization header if a token exists
    if (token!=null) {
       console.log("i am running");
       authReq = authReq.clone({
        setHeaders: {
          Authorization: `Bearer  ${token}`
        },
      });
    }

    console.log("request", JSON.stringify(authReq, null, 2));

    return next.handle(authReq);
   
  }
}
