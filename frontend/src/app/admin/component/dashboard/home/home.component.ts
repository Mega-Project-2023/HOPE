import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/admin/service/api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    token: '',
    status: ''
  };
  constructor(private fb : FormBuilder ,private api : ApiService) { }

  userList : User[] = [];
  volunteerList : User[] = [];
  totalOrders : number = 0;
  pendingRequests : number = 0;
  volunteerRegisterData = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password : new FormControl()
  });

  ngOnInit(): void {
    this.init();
    this.loadAll();
  }

  init() {
    this.volunteerRegisterData = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loadAll() {
    this.getAllUsers();
    this.getAllVolunteers();
    this.getAllOrders();
  }

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: data => {
        this.userList = this.transformRole(data);
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  getAllVolunteers() {
    this.api.getAllVolunteers().subscribe({
      next: data => {
        this.volunteerList = this.transformRole(data);
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  getAllOrders() {
    this.api.getAllRequests().subscribe({
      next: data => {
        this.totalOrders = data.length;
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  volunteerRegister() {
    this.user.firstName = this.volunteerRegisterData.value.firstName!;
    this.user.lastName = this.volunteerRegisterData.value.lastName!;
    this.user.email = this.volunteerRegisterData.value.email!;
    this.user.password = this.volunteerRegisterData.value.password!;
    this.user.role = "ROLE_VOLUNTEER";
    this.user.status = "ACTIVE";
    console.log(this.user);
    this.api.addVolunteer(this.user).subscribe({
      next: data => {
        this.init();
        this.getAllVolunteers();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    });

  }

  transformRole(list : any) {
    list.forEach((element : any)=> {
      element.role = element.role.slice(5);
    });
    return list;
  }
}
