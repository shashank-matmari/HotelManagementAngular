import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roomtype } from '../models/roomtype';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {
  private apiurl = 'http://localhost:8083/api/RoomType/';
  
  constructor(private http: HttpClient) { }

  async createRoomType(room: Roomtype): Promise<Roomtype> {
    return firstValueFrom(this.http.post<Roomtype>(`${this.apiurl}post`, room).pipe(
      catchError(this.handleError)
    ));
  }

  async getAllRoomType(): Promise<Roomtype[]> {
    return firstValueFrom(this.http.get<Roomtype[]>(`${this.apiurl}all`).pipe(
      catchError(this.handleError)
    ));
  }

  async getRoomById(id: number): Promise<Roomtype> {
    return firstValueFrom(this.http.get<Roomtype>(`${this.apiurl}${id}`).pipe(
      catchError(this.handleError)
    ));
  }

  async deleteById(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiurl}delete/${id}`).pipe(
      catchError(this.handleError)
    ));
  }

  async updateRoomTypeById(id: number, roomtype: Roomtype): Promise<Roomtype> {
    return firstValueFrom(this.http.put<Roomtype>(`${this.apiurl}update/${id}`, roomtype).pipe(
      catchError(this.handleError)
    ));
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
