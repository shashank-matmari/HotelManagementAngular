import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';
// Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:8083/api/user'; // Backend url

  constructor(private http: HttpClient) { }

  // Create a new user
  createUser(user: UserDetails): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, user);
  }

  // Get all users
  getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.apiUrl}/all`);
  }

  // Get user by ID
  getUserById(userId: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/${userId}`);
  }

  // Update user
  updateUser(userId: number, user: UserDetails): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.apiUrl}/update/${userId}`, user);
  }

  // Delete user by ID
  deleteUserById(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`);
  }
}
