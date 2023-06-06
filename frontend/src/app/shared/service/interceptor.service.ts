import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
    let userid = localStorage.getItem('userid')!;
    let role = localStorage.getItem('role')!;
    let token = localStorage.getItem('token')!;
    let jwt;
    if(userid && role && token) {
      jwt = req.clone({
        setHeaders: {
          userid : userid,
          role : role,
          token : token
        }
      });
    } else {
      jwt = req.clone();
    }

    return next.handle(jwt).pipe(
      catchError((errorData: any) => {
        return throwError(errorData);
      })
    );
  }
}
