import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Donation } from 'src/app/shared/model/donation';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  donationURL : string = 'http://localhost:8080/donation';
  eventURL : string = 'http://localhost:8080/event/admin/subscribe';
  authURL : string = 'http://localhost:8080/auth';

  constructor(private http : HttpClient, private ngzone : NgZone) { }

  addVolunteer(user : User) : Observable<User>{
    return this.http.post<User>(this.authURL+'/add-new/volunteer',user);
  }

  getAllVolunteers() : Observable<User[]>{
    return this.http.get<User[]>(this.authURL+'/get-all/role_volunteer');
  }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.authURL+'/get-all/role_user');
  }

  suspendUser(user : User, userId : string) : Observable<User> {
    return this.http.put<User>(this.authURL+'/suspend/user/'+userId,user);
  }

  acceptRequest(donationId : string) : Observable<Donation>{
    return this.http.put<Donation>(this.donationURL+'/accept-request/'+donationId, {});
  }

  rejectRequest(donationId : string) : Observable<Donation>{
    return this.http.put<Donation>(this.donationURL+'/reject-request/'+donationId, {});
  }

  getAllPendingRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/get/pending/requests');
  }

  getAllPickupScheduledRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/get/pickup_scheduled/requests');
  }

  getAllRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/get/all/requests');
  }

  getUserProfile(userId : string) : Observable<User> {
    return this.http.get<User>(this.authURL+'/get/user/'+userId);
  }

  getDonationRequestInfo(donationId : string) : Observable<any> {
    return this.http.get<any>(this.donationURL+'/get/'+donationId);
  }

  getPendingRequestEvent() {
    return Observable.create((obeserver : any) => {
        const eventSource = new EventSource(this.eventURL);
          eventSource.onopen = (ev) => {
            console.log('Connection to server opened.', ev);
          };
          eventSource.onerror = (ev) => {
            console.log('EventSource failed.', ev);
          };
          eventSource.addEventListener('newDonationRequest', event => {
            this.ngzone.run(() => {
              obeserver.next(event.data);
            });
          });

    });
  }

  requestUpdateEvent() {
    return Observable.create((obeserver : any) => {
        const eventSource = new EventSource(this.eventURL);
          eventSource.onopen = (ev) => {
            console.log('Connection to server opened.', ev);
          };
          eventSource.onerror = (ev) => {
            console.log('EventSource failed.', ev);
          };
          eventSource.addEventListener('requestUpdate', event => {
            console.log("request update event")
            this.ngzone.run(() => {
              obeserver.next(event.data);
            });
          });

    });
  }

  logout() : Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    if(localStorage.getItem('userid')) {
      headers.set('userid', localStorage.getItem('userid')!)
      .set('role', localStorage.getItem('role')!)
      .set('token', localStorage.getItem('token')!);
    }

    return this.http.put<any>(this.authURL+'/logout',{'headers':headers})
  }

}
