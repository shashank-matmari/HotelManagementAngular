import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { BehaviorSubject, catchError, firstValueFrom, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8083/api/rooms"

  private room = new BehaviorSubject<Room | null>(null);
  room$ = this.room.asObservable();

  public getAllRooms(): Promise<Room[]> {
    return firstValueFrom(this.http.get<Room[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    ));
  }

  public getRoomById(room_id: number): Promise<Room> {
    return firstValueFrom(this.http.get<Room>(`${this.apiUrl}/${room_id}`).pipe(
      catchError(this.handleError)
    ));
  }

  public getRoomsAvailableByDateRange(hotel_id: number, startDate: string, endDate: string): Promise<Room[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return firstValueFrom(this.http.get<Room[]>(`${this.apiUrl}/getAvalilability/${hotel_id}/`, { params }).pipe(
      catchError(this.handleError)
    ));
  }

  onSelect(room: Room) {
    let hotel = JSON.parse(localStorage.getItem('selectedHotel')!);
    if (hotel.hotel_id) {
      hotel.room_id = room.room_id;
      localStorage.setItem('selectedHotel', JSON.stringify(hotel));
      this.room.next(room);
    }
  }

  public createRoom(hotel_id: number, room: any): Promise<any> {
    const body = {
      room_number: room.room_number,  // Ensure this matches the form control
      is_available: room.availability,  // Availability should map to the correct field
      room_type_id: room.room_type_id,  // Use room_type_id as defined in the form
    };
  
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}/post/${hotel_id}`, body).pipe(
      catchError(this.handleError)
    ));
  }



  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

}
