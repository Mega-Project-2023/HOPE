import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerDashboardComponent } from './component/volunteer-dashboard/volunteer-dashboard.component';
import { PickupsComponent } from './component/volunteer-dashboard/pickups/pickups.component';
import { VolunteerHomeComponent } from './component/volunteer-dashboard/volunteer-home/volunteer-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    VolunteerDashboardComponent,
    PickupsComponent,
    VolunteerHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ]
})
export class VolunteerModule { }
