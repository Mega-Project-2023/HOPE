import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('successModal')
  successModal: ElementRef | undefined;

  @ViewChild('failModal')
  failModal: ElementRef | undefined;

  response: string = "";
  userObject: User = {
    email: '',
    password: '',
    userId: '',
    firstName: '',
    lastName: '',
    role: '',
    token: '',
    status: ''
  };
  userRegisterData = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })
  showPassword : boolean = false;
  showConfirmPassword : boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private route : Router) { }

  ngOnInit(): void {
    this.userRegisterData = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  userRegister() {
    this.userObject.firstName = this.userRegisterData.value.firstName;
    this.userObject.lastName = this.userRegisterData.value.lastName;
    this.userObject.email = this.userRegisterData.value.email;
    this.userObject.password = this.userRegisterData.value.password;
    this.userObject.role = 'ROLE_USER';
    this.auth.register(this.userObject).subscribe({
      next : (data) => {
        this.response = 'User registerd successfully.'
        this.successModal?.nativeElement.click();
      },
      error : (err) => {
        this.response = err.error.msg;
        this.failModal?.nativeElement.click();
        console.log(err);
      }
    });

  }

  changePasswordProperty() {
    this.showPassword = !this.showPassword;
  }

  changeConfirmPasswordProperty() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
