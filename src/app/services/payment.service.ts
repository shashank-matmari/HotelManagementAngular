import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';

// import { SuccessResponse } from '../../../../../payment 1 (2) (2)/payment 1/payment/src/app/success-response';
import { Payment } from '../models/payment'; 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl="http://localhost:8083/api/payment/"
 // baseUrl: any;
  

  constructor(private http:HttpClient) { }

  createPayment(payment:Payment):Observable<Payment>{
    return this.http.post<Payment>(`${this.apiUrl}post`,payment);
  }



    // private Payment = new Subject<Payment>()
    // Payment$:Observable<Payment>=this.Payment.asObservable()

  getAllPayments():Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.apiUrl}all`);
  }

  // deletePayment(PaymentId:string):Observable<void>{
  //   return this.http.delete<void>('${this.apiUrl}${PaymentId}')
  // }


  // Get a list of all payments
  // getAllPayments(): Observable<Payment[]> {
  //   return this.http.get<Payment[]>(`${this.apiUrl}`).pipe(
  //     catchError(this.handleError)
  //     );
  // }

  // Get Payment By Id
  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}${paymentId}`)
  }

  getPaymentsByStatus(status:string):Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.apiUrl}status/${status}`)
  }

  deletePaymentById(id:number):Observable<Payment>{
    return this.http.delete<Payment>(`${this.apiUrl}delete/${id}`);
  }
  getpaymentTotalRevenue():Observable<Payment>{
    return this.http.get<Payment>(`${this.apiUrl}total-revenue`);
  }
  
  getRecentlyLastTranscation():Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.apiUrl}recent_payment`)
  }

  getPaymentsByUserEmail(email:string){
    return this.http.get<any[]>(`${this.apiUrl}user/${email}`);
  }

}