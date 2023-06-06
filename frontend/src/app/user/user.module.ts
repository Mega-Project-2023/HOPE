import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { PendingDonationsTableComponent } from './component/user-dashboard/pending-donations-table/pending-donations-table.component';
import { PreviousDonationsTableComponent } from './component/user-dashboard/previous-donations-table/previous-donations-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    PendingDonationsTableComponent,
    PreviousDonationsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: []
})
export class UserModule { }
