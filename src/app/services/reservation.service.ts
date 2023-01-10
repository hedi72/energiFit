

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  SERVER_URL : string='http://localhost:3000';

  constructor(private httpClient : HttpClient ) { }

  public addReservation(reservation:any){
    console.log("here in addReservation in service");
    
    return this.httpClient.post<{message:String}>(this.SERVER_URL + '/api/addReservation',reservation)
  }
  public getReservations(){ 
    return this.httpClient.get<{reservations : any}>(this.SERVER_URL + '/api/allReservations');
}
public getReservation(reservationId:any){
  return this.httpClient.get <{plat : any}>(`${this.SERVER_URL + '/api/allReservations'}/${reservationId}`); 
}


public deleteReservation(reservationId:any){
  return this.httpClient.delete<{message:String}>(`${this.SERVER_URL + '/api/allReservations'}/${reservationId}`)
}
public updateReservation(reservation:any){
  return this.httpClient.put<{message:String}>(`${this.SERVER_URL + '/api/allReservations'}/${reservation._id}`, reservation)
}
public getMyReservation(idTrainer){
  return this.httpClient.get<{myPlats:any}>(`${this.SERVER_URL + '/api/myReservations'}/${idTrainer}`)
}
}
