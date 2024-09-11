import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from '../models/amenity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {
  private apiurl="http://localhost:8083/api/amenity/"

  constructor(private http:HttpClient) { }

  createAmenity(amenity:Amenity):Observable<Amenity>{
    return this.http.post<Amenity>(`${this.apiurl}post`,amenity)

  }
  getAllAmenities():Observable<Amenity[]>{
    return this.http.get<Amenity[]>(`${this.apiurl}all`)
  }
  
  getAmenityById(id:number):Observable<Amenity>{
    return this.http.get<Amenity>(`${this.apiurl}${id}`)
  }

  
  deleteAmenityById(id:number):Observable<Amenity>{
    return this.http.delete<Amenity>(`${this.apiurl}delete/${id}`)
  }

  updateAmenityById(id:number,amenity:Amenity):Observable<Amenity>{
    return this.http.put<Amenity>(`${this.apiurl}update/${id}`,amenity)
  }
}
