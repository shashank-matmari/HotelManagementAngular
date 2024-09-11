import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiurl = `http://localhost:8083/api/review/`;

  constructor(private http: HttpClient) { }

  getAllReviews(): Promise<Review[]> {
    return firstValueFrom(this.http.get<Review[]>(`${this.apiurl}all`).pipe(
      catchError(this.handleError)
    ))
  }

  getReviewById(id: number): Promise<Review> {
    return firstValueFrom(this.http.get<Review>(`${this.apiurl}${id}`).pipe(
      catchError(this.handleError)
    ))
  }

  getReviewsByrating(rating: number): Promise<Review[]> {
    return firstValueFrom(this.http.get<Review[]>(`${this.apiurl}rating/${rating}`).pipe(
      catchError(this.handleError)
    ))
  }

  getRecentReviews(): Promise<Review[]> {
    return firstValueFrom(this.http.get<Review[]>(`${this.apiurl}recent`).pipe(
      catchError(this.handleError)
    ))
  }

  deleteReviewById(id: number): Promise<Review> {
    return firstValueFrom(this.http.delete<Review>(`${this.apiurl}delete/${id}`).pipe(
      catchError(this.handleError)
    ))
  }

  createReview(Review: Review): Promise<Review> {
    return firstValueFrom(this.http.post<Review>(`${this.apiurl}post`, Review).pipe(
      catchError(this.handleError)
    ))
  }

  updateReview(id: number, review: Review): Promise<Review> {
    return firstValueFrom(this.http.put<Review>(`${this.apiurl}update/${id}`, review).pipe(
      catchError(this.handleError)
    ))
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

}
