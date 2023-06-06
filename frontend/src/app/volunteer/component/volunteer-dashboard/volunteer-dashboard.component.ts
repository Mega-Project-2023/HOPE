import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/admin/service/api.service';
import { VolunteerService } from '../../service/volunteer.service';
import { Donation } from 'src/app/shared/model/donation';

@Component({
  selector: 'app-volunteer-dashboard',
  templateUrl: './volunteer-dashboard.component.html',
  styleUrls: ['./volunteer-dashboard.component.css']
})
export class VolunteerDashboardComponent implements OnInit, OnDestroy {

  pickupRequests : number = 0;
  sub!: Subscription;
  donationReq : Donation = {
    donationId: '',
    userId: '',
    volunteerId: '',
    address: '',
    noOfPeople: 0,
    noOfHoursAfterPreparation: 0,
    comment: '',
    status: '',
    timestamp: ''
  }
  constructor(private api : VolunteerService, private route : Router) {}

  ngOnInit(): void {
    this.getAllNonProcessedRequests();
    this.listenToRequestUpdateEvents();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  listenToRequestUpdateEvents() {
    this.sub = this.api.requestUpdateEvent().subscribe({
      next: (data: any) => {
          this.getAllNonProcessedRequests();
      },
      error : (msg: any) => {
        console.log('Error: ', msg.error);
      }
    })
  }

  getAllNonProcessedRequests() {
    this.api.getAllNonProcessedRequests().subscribe({
      next: data => {
        console.log("Inside getAllNonProcessedRequests")
        this.pickupRequests = data.length;
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
