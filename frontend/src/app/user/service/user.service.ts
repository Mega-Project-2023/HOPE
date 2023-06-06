import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/shared/model/donation';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authURL : string = 'http://localhost:8080/auth';
  donationURL : string = 'http://localhost:8080/donation';
  userId : string = localStorage.getItem('userid')!;
  eventURL : string = 'http://localhost:8080/event/user/'+this.userId+'/subscribe';

  constructor(private http : HttpClient, private ngzone : NgZone) { }

  logout() : Observable<any> {
    return this.http.put<any>(this.authURL+'/logout', {});
  }

  getAllDonationRequest() : Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationURL+'/'+this.userId+'/get/all/requests');
  }

  createNewDonationRequest(donation : Donation) : Observable<Donation> {
    return this.http.post<Donation>(this.donationURL+'/new-request',donation);
  }

  getDonationRequestInfo(donationId : string) : Observable<any> {
    return this.http.get<any>(this.donationURL+'/get/'+donationId);
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
          eventSource.addEventListener(this.userId+'_requestUpdate', event => {
            this.ngzone.run(() => {
              console.log(event);
              obeserver.next(event.data);
            });
          });

    });
  }

}
