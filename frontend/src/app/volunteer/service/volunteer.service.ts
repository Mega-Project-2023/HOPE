import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/shared/model/donation';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  donationURL : string = 'http://localhost:8080/donation';
  eventURL : string = 'http://localhost:8080/event/volunteer/subscribe';
  authURL : string = 'http://localhost:8080/auth';
  volunteerId : string = localStorage.getItem('userid')!;

  constructor(private http : HttpClient, private ngzone : NgZone) { }

  getAllNonProcessedRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/getall/not-processed/request');
  }

  getAllReadyToPickRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/getall/pickup/accepted/requests');
  }

  getAllCompletedRequests() : Observable<Donation[]>{
    return this.http.get<Donation[]>(this.donationURL+'/getall/completed/request');
  }

  acceptPickUpRequest(donationId : string) : Observable<Donation>{
    return this.http.put<Donation>(this.donationURL+'/accept-pickup/'+donationId+'/'+this.volunteerId,{})
  }

  completePickupRequest(donationId : string) : Observable<Donation> {
    return this.http.put<Donation>(this.donationURL+'/complete-pickup/'+donationId+'/'+this.volunteerId,{})
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
