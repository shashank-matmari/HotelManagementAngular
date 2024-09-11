import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Hotel } from '../models/hotel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Room } from '../models/room';
import { Hoteldto } from '../models/hoteldto';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private urlPth = "http://localhost:8083/api/hotels/";

  constructor(private http: HttpClient) { }

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  // Track the currently selected hotel
  private hotel = new BehaviorSubject<Hotel | null>(null);
  hotel$: Observable<Hotel | null> = this.hotel.asObservable();

  private check_in_date=new BehaviorSubject<string>('');
  check_in_date$=this.check_in_date.asObservable();

  private check_out_date=new BehaviorSubject<string>('');
  check_out_date$=this.check_in_date.asObservable();

  // Track locations for filtering
  private location = new BehaviorSubject<string[]>([]);
  location$: Observable<string[]> = this.location.asObservable();

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  // Get all hotels
  getAllHotels(): Promise<Hotel[]> {
    return firstValueFrom(this.http.get<Hotel[]>(`${this.urlPth}all`).pipe(
      catchError(this.handleError)
    ))
  }

  // Delete a hotel by ID
  deleteHotel(hotel_id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.urlPth}${hotel_id}`).pipe(
      catchError(this.handleError)
    ))
  }

  // Create a new hotel
  createHotel(hotel: Hoteldto): Promise<Hotel> {
    return firstValueFrom(this.http.post<Hotel>(`${this.urlPth}post`, hotel).pipe(
      catchError(this.handleError)
    ));
  }

  // Update an existing hotel by ID
  updateHotel(hotel_id: number, hotel: Hoteldto): Promise<Hotel> {
    return firstValueFrom(this.http.put<Hotel>(`${this.urlPth}update/${hotel_id}`, hotel).pipe(
      catchError(this.handleError)
    ));
  }

  // Set the selected hotel
  onSelect(hotel: Hotel) {
    localStorage.setItem('selectedHotel', JSON.stringify({ 'hotel_id': hotel.hotel_id }));
    this.hotel.next(hotel);
  }

  onDateSelect(check_in_date:string,check_out_date:string){
    this.check_in_date.next(check_in_date);
    this.check_out_date.next(check_out_date);
  }

  // Filter hotels by location
  filterByLocation(location: string): Promise<Hotel[]> {
    return firstValueFrom(this.http.get<Hotel[]>(`${this.urlPth}location/${location}`).pipe(
      catchError(this.handleError)
    ));
  }

  // Get all rooms for a hotel by hotel ID
  getAllRooms(hotel_id: number): Promise<Room[]> {
    return firstValueFrom(this.http.get<Room[]>(`${this.urlPth}allrooms/${hotel_id}`).pipe(
      catchError(this.handleError)
    ));
  }

  // Get a specific hotel by ID
  getHotelById(hotel_id: number): Promise<Hotel> {
    return firstValueFrom(this.http.get<Hotel>(`${this.urlPth}${hotel_id}`).pipe(
      catchError(this.handleError)
    ));
  }

  addAmenityToHotel(hotel_id:number,amenity_id:number):Promise<Response>{
    const body = {
      hotel_id: hotel_id,
      amenity_id: amenity_id
    };
    
    return firstValueFrom(this.http.post<Response>(`${this.urlPth}hotelamenity/post`, body).pipe(
      catchError(this.handleError)
    ));
    
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
