import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/admin/service/api.service';
import { Donation } from 'src/app/shared/model/donation';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = ['donationId', 'noofServings', 'status', 'address', 'comment', 'action'];
  dataSource: MatTableDataSource<any>;
  totalOrders : Donation[] =[];
  expandedElement!: Donation;
  DonationReqInfo : any;
  sub !:  Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api : ApiService, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllPendingRequests();
    this.listenToPendingRequestEvents();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
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

  getAllPendingRequests() {
    this.api.getAllPendingRequests().subscribe({
      next: data => {
        this.totalOrders = data;
        this.dataSource = new MatTableDataSource(this.totalOrders);
        this.ngAfterViewInit();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  listenToPendingRequestEvents() {
    console.log("Inside pending req")
    this.sub = this.api.getPendingRequestEvent().subscribe({
      next: (data: any) => {
        this.getAllPendingRequests();
      },
      error : (msg: any) => {
        console.log('Error: ', msg.error);
      }
    })
  }

  acceptRequestDetails(donationId : string) {
    this.api.acceptRequest(donationId).subscribe({
      next: data => {
        this.DonationReqInfo = data;
        this.openSnackBar("Donation request is accepted.","OK")
        this.getAllPendingRequests();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  rejectRequestDetails(donationId : string) {
    this.api.rejectRequest(donationId).subscribe({
      next: data => {
        console.log(data);
        this.DonationReqInfo = data;
        this.openSnackBar("Donation request is rejected.","OK")
        this.getAllPendingRequests();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
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

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }
}
