import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('modal')
  modal: ElementRef | undefined;

  userObject : User = {
    email: '',
    password: '',
    role: '',
    userId: '',
    firstName: '',
    lastName: '',
    token: '',
    status: ''
  };
  response : String ='';
  userLoginData = new FormGroup({
    email : new FormControl(),
    password : new FormControl(),
    role : new FormControl()
  })
  showPassword : boolean = false;
  error : string = '';

  constructor(private fb : FormBuilder, private auth : AuthService, private route : Router) { }

  ngOnInit(): void {
    this.userLoginData = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]],
      role : ['', [Validators.required]]
    });
    this.response = "";
  }

  userLogin()  {
    this.userObject.email = this.userLoginData.value.email;
    this.userObject.password = this.userLoginData.value.password;
    this.userObject.role = this.userLoginData.value.role;

    this.auth.login(this.userObject)
    .subscribe({
      next: data => {
        if(data) {
          console.log(data);
          localStorage.setItem('userid',data.userId);
          localStorage.setItem('token',data.token);
          localStorage.setItem('role',data.role);
          localStorage.setItem('firstName',data.firstName);

          if(data.role === 'ROLE_USER') {
            this.route.navigate(['/user/dashboard'])
          } else if(data.role === 'ROLE_ADMIN') {
            this.route.navigate(['/admin/dashboard'])
          } else if(data.role === 'ROLE_VOLUNTEER') {
            this.route.navigate(['/volunteer/dashboard'])
          }
        }

      },
      error : msg => {
        this.response = msg.error.message;
        this.modal?.nativeElement.click();
        console.log(msg);
      }
    })


  }

  changePasswordProperty() {
    this.showPassword = !this.showPassword;
  }
}
