import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/component/login/login.component';
import { RegisterComponent } from './shared/component/register/register.component';
import { LandingPageComponent } from './shared/component/landing-page/landing-page.component';
import { UserDashboardComponent } from './user/component/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './admin/component/dashboard/dashboard.component';
import { HomeComponent } from './admin/component/dashboard/home/home.component';
import { HistoryComponent } from './admin/component/dashboard/history/history.component';
import { PendingRequestComponent } from './admin/component/dashboard/pending-request/pending-request.component';
import { AuthguardService } from './shared/service/authguard.service';
import { VolunteerDashboardComponent } from './volunteer/component/volunteer-dashboard/volunteer-dashboard.component';
import { PickupsComponent } from './volunteer/component/volunteer-dashboard/pickups/pickups.component';
import { VolunteerHomeComponent } from './volunteer/component/volunteer-dashboard/volunteer-home/volunteer-home.component';

const routes: Routes = [
  {
    path: '', component : LandingPageComponent
  },
  {
    path: 'login', component : LoginComponent
  },
  {
    path: 'register', component : RegisterComponent
  },
  {
    path: 'user', children: [
      {path: 'dashboard', component: UserDashboardComponent}
    ], canActivate : [AuthguardService]
  },
  {
    path: 'volunteer', children: [
      {path: 'dashboard', component: VolunteerDashboardComponent, children: [
          {path : '', pathMatch : 'full', redirectTo: 'home'},
          { path: 'home', component: VolunteerHomeComponent },
          { path: 'pickups', component: PickupsComponent },
        ]
      }
    ], canActivate : [AuthguardService]
  },
  {
    path: 'admin', children: [
      { path: 'dashboard', component: DashboardComponent, children :[
          {path : '', pathMatch : 'full', redirectTo: 'home'},
          { path: 'home', component: HomeComponent },
          { path: 'history', component: HistoryComponent },
          { path: 'pending-request', component: PendingRequestComponent }
        ], canActivate : [AuthguardService]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
