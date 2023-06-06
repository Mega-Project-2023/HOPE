import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  pendingRequests : number = 0;
  sub1!: Subscription;
  sub2!: Subscription;

  constructor(private api : ApiService, private route : Router) {}

  ngOnInit(): void {
    this.getAllPendingRequests();
    this.listenToPendingRequestEvents();
    this.listenToRequestUpdateEvents();
  }

  ngOnDestroy(): void {
    this.sub1 && this.sub1.unsubscribe();
    this.sub2 && this.sub2.unsubscribe();
  }

  listenToPendingRequestEvents() {

    this.sub1 = this.api.getPendingRequestEvent().subscribe({
      next: (data: any) => {
        this.getAllPendingRequests();
      },
      error : (msg: any) => {
        console.log('Error: ', msg.error);
      }
    })
  }

  listenToRequestUpdateEvents() {
    console.log("Inside dahsboard")
    this.sub2 = this.api.requestUpdateEvent().subscribe({
      next: (data: any) => {
        this.pendingRequests = data;
      },
      error : (msg: any) => {
        console.log('Error: ', msg.error);
      }
    })
  }

  getAllPendingRequests() {
    this.api.getAllPendingRequests().subscribe({
      next: data => {
        this.pendingRequests = data.length;
      },
      error : msg => {
        console.log('Error: ', msg.error);
      }
    })
  }

  logout() {
    this.api.logout().subscribe({
      next : data => {
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('firstName');
        this.route.navigate(['/']);
      },
      error : msg => {
        console.log(msg);
      }
    })
  }

}
