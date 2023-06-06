import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/admin/service/api.service';
import { Donation } from 'src/app/shared/model/donation';
import { VolunteerService } from 'src/app/volunteer/service/volunteer.service';

@Component({
  selector: 'app-pickups',
  templateUrl: './pickups.component.html',
  styleUrls: ['./pickups.component.css']
})
export class PickupsComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = ['donationId', 'noofServings', 'status', 'address', 'comment', 'action'];
  dataSource: MatTableDataSource<any>;
  pickupRequest : Donation[] =[];
  readyToPickRequest : Donation[] = [];
  expandedElement!: Donation;
  DonationReqInfo : any;
  sub !:  Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api : VolunteerService, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllReadyToPickRequests();
    this.getAllNonProcessedRequests();
    this.listenToRequestUpdateEvents();
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

  getAllNonProcessedRequests() {
    this.api.getAllNonProcessedRequests().subscribe({
      next: data => {
        this.pickupRequest = data;
        this.dataSource = new MatTableDataSource(this.pickupRequest);
        this.ngAfterViewInit();
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  getAllReadyToPickRequests() {
    this.api.getAllReadyToPickRequests().subscribe({
      next: data => {
        this.readyToPickRequest = data;
        this.DonationReqInfo = data[0];
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
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

  acceptPickupRequest(donationId : string) {
    this.api.acceptPickUpRequest(donationId).subscribe({
      next: data => {
        this.DonationReqInfo = data;
        this.getAllReadyToPickRequests();
        this.openSnackBar("Donation request is accepted.","OK")
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

  completePickupRequest(donationId : string) {
    this.api.completePickupRequest(donationId).subscribe({
      next: data => {
        this.openSnackBar("Donation request is completed.","OK")
        this.getAllNonProcessedRequests();
        this.getAllReadyToPickRequests();
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
