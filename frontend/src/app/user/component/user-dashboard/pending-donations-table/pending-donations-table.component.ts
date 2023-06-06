import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Donation } from 'src/app/shared/model/donation';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-pending-donations-table',
  templateUrl: './pending-donations-table.component.html',
  styleUrls: ['./pending-donations-table.component.css']
})
export class PendingDonationsTableComponent implements OnInit {
  displayedColumns: string[] = ['donationId', 'noofServings', 'status', 'address', 'comment', 'action'];
  dataSource: MatTableDataSource<any>;
  pendingRequests : Donation[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sub !: Subscription;
  DonationReqInfo: any;
  constructor(private userService : UserService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllDonationRequests();
    this.listenToRequestUpdateEvents();
  }

  ngOnChanges(changes: any): void {
    for (const propName in changes) {
      this.pendingRequests = changes[propName].currentValue;
      this.dataSource = new MatTableDataSource(this.pendingRequests);
    }
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
    this.userService.getDonationRequestInfo(donationId).subscribe({
      next: data => {
        console.log(data);
        this.DonationReqInfo = data;
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  getAllDonationRequests() {
    this.userService.getAllDonationRequest().subscribe({
      next: data => {
        this.pendingRequests = [];
        this.processDonationRequestList(data);
        this.dataSource = new MatTableDataSource(this.pendingRequests);
        this.ngAfterViewInit();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  processDonationRequestList(data : Donation[]) {
    data.forEach(element => {
      if(element.status !== 'REJECTED' && element.status !== 'COMPLETED') {
        this.pendingRequests.push(element);
      }
    });
  }

  listenToRequestUpdateEvents() {
    this.sub = this.userService.requestUpdateEvent().subscribe({
      next: (data: any) => {
        this.getAllDonationRequests();
      },
      error : (msg: any) => {
        console.log('Error: ', msg.error);
      }
    })
  }


}
