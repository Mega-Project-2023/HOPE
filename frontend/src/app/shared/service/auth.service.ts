import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL : string = 'http://localhost:8080/auth/';
  userObj : any = {
    userid: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    token: '',
    status: ''
  }

  constructor(private http : HttpClient) { }

  login(userObject: User): Observable<any>{
    return this.http.post<User>(this.authURL+'login',userObject);
  }

  register(userObject: any) : Observable<User>{
    return this.http.post<User>(this.authURL+'register/user',userObject);
  }

  isUserLoggedIn() : Boolean{
    let userid = localStorage.getItem('userid')!;
    let role = localStorage.getItem('role')!;
    let token = localStorage.getItem('token')!;
    if(userid && role && token) {
      return true;
    }
    return false;
  }

}
