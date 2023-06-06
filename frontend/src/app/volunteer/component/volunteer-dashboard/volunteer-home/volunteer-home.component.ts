import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Donation } from 'src/app/shared/model/donation';
import { UserService } from 'src/app/user/service/user.service';
import { VolunteerService } from 'src/app/volunteer/service/volunteer.service';

@Component({
  selector: 'app-volunteer-home',
  templateUrl: './volunteer-home.component.html',
  styleUrls: ['./volunteer-home.component.css']
})
export class VolunteerHomeComponent implements OnInit {
  displayedColumns: string[] = ['donationId', 'noofServings', 'status', 'address', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;
  processedRequests : Donation[] = [];
  firstName : string = localStorage.getItem('firstName')!;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  DonationReqInfo: any;
  constructor(private api : VolunteerService) {}

  ngOnInit(): void {
    this.getAllCompletedRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewRequestDetails(donationId : string) {
    this.api.getDonationRequestInfo(donationId).subscribe({
      next: data => {
        console.log(data);
        this.DonationReqInfo = data;
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  getAllCompletedRequests() {
    this.api.getAllCompletedRequests().subscribe({
      next: data => {
        this.processedRequests = data;
        this.dataSource = new MatTableDataSource(data);
        this.ngAfterViewInit();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }


}
