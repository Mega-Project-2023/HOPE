import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HistoryComponent } from './component/dashboard/history/history.component';
import { PendingRequestComponent } from './component/dashboard/pending-request/pending-request.component';
import { HomeComponent } from './component/dashboard/home/home.component';
import { UserTableComponent } from './component/dashboard/home/user-table/user-table.component';
import { VolunteerTableComponent } from './component/dashboard/home/volunteer-table/volunteer-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    PendingRequestComponent,
    HomeComponent,
    UserTableComponent,
    VolunteerTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: []
})
export class AdminModule { }
