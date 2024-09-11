import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllDetails } from '../models/all-details';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl="http://localhost:8083/api/reservation/"

  constructor(private http:HttpClient) { }

  addReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.post<Reservation>(`${this.apiUrl}post`,reservation)
  }

  getAllReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}all`)
  }

  getAllReservationsWithRoom():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}allwithrooms`)
  }

  getReservationById(id:number):Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiUrl}${id}`)
  }

  getReservationByIdwithRoom(id:number):Observable<Reservation>{
    console.log("called to update")
    return this.http.get<Reservation>(`${this.apiUrl}withroom/${id}`)
  }

  deleteReservation(id:number):Observable<void>{
    console.log("Called to delete")
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`) 
  }

  updateReservation(reservationId:number, reservation:Reservation):Observable<Reservation>{
    return this.http.put<Reservation>(`${this.apiUrl}update/${reservationId}`, reservation)
  }

  getAllDetailsByReservationId(reservaitonId:number):Observable<AllDetails[]>{
    return this.http.get<AllDetails[]>(`${this.apiUrl}alldetails/${reservaitonId}`)
  }

  getReservationsByDateRange(startDate: string, endDate: string): Observable<any[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any[]>(`${this.apiUrl}date-range`, { params });
  }

  getReservationByUserEmail(email:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}user/${email}`);
  }

}
