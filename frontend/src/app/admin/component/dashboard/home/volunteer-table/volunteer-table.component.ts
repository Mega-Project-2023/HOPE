import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VolunteerModule } from 'src/app/volunteer/volunteer.module';

@Component({
  selector: 'app-volunteer-table',
  templateUrl: './volunteer-table.component.html',
  styleUrls: ['./volunteer-table.component.css']
})
export class VolunteerTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];
  dataSource: MatTableDataSource<any>;
  @Input() volunteerList : VolunteerModule[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    for (const propName in changes) {
      this.volunteerList = changes[propName].currentValue;
      this.dataSource = new MatTableDataSource(this.volunteerList);
    }
    this.initPaginatorAndSort();
  }

  initPaginatorAndSort() {
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

  slice(input : string) {
    return input.slice(5);
  }


}
