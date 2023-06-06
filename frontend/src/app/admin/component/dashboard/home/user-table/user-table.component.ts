import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/admin/service/api.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];
  dataSource: MatTableDataSource<any>;
  @Input() userList : User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api : ApiService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    for (const propName in changes) {
      this.userList = changes[propName].currentValue;
      this.dataSource = new MatTableDataSource(this.userList);
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

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: data => {
        this.userList = data;
      },
      error : msg => {
        console.log('Error: ', msg);
      }
    })
  }

}
