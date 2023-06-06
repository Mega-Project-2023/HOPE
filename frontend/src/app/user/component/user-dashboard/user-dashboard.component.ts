import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Donation } from 'src/app/shared/model/donation';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
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
  processedRequests : Donation[] = [];
  pendingRequests : Donation[] = [];
  firstName : string = '';
  newDonationReq = new FormGroup({
    address : new FormControl(''),
    noOfPeople :  new FormControl(0),
    noOfHoursAfterPreparation :  new FormControl(0),
    comment : new FormControl('')
  });
  constructor(private fb : FormBuilder, private userService : UserService, private route : Router) {}

  ngOnInit(): void {
    this.init();
    this.getAllDonationRequests();
    this.firstName = localStorage.getItem('firstName')!;
    console.log(this.firstName);
  }

  init() {
    this.newDonationReq = this.fb.group({
      address : ['', [Validators.required]],
      noOfPeople :  [0, [Validators.required]],
      noOfHoursAfterPreparation : [0, [Validators.required]],
      comment : ['', [Validators.required]]
    });
  }

  newDonationRequest() {
    this.donationReq.address = this.newDonationReq.value.address!;
    this.donationReq.noOfPeople = this.newDonationReq.value.noOfPeople!;
    this.donationReq.noOfHoursAfterPreparation = this.newDonationReq.value.noOfHoursAfterPreparation!;
    this.donationReq.comment = this.newDonationReq.value.comment!;
    this.donationReq.userId = localStorage.getItem('userid')!;
    console.log(this.donationReq);

    this.userService.createNewDonationRequest(this.donationReq).subscribe({
      next: data => {
        location.reload();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    });

  }

  getAllDonationRequests() {
    this.userService.getAllDonationRequest().subscribe({
      next: data => {
        this.processDonationRequestList(data);
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  processDonationRequestList(data : Donation[]) {
    data.forEach(element => {
      if(element.status === 'REJECTED' || element.status === 'COMPLETED') {
        this.processedRequests.push(element);
      } else {
        this.pendingRequests.push(element);
      }
    });
  }

  logout() {
    this.userService.logout().subscribe({
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
