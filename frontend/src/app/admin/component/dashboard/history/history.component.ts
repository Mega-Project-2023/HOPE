import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/admin/service/api.service';
import { Donation } from 'src/app/shared/model/donation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['donationId', 'noofServings', 'status', 'address', 'comment', 'action'];
  dataSource: MatTableDataSource<any>;
  totalOrders : Donation[] =[];
  expandedElement!: Donation;
  DonationReqInfo : any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api : ApiService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllOrders();
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

  getAllOrders() {
    this.api.getAllRequests().subscribe({
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

}
