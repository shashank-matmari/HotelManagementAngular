import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-all-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-payments.component.html',
  styleUrl: './all-payments.component.css'
})
export class AllPaymentsComponent implements OnInit{

  payments!:Payment[];
  reservationId!:Payment;

  constructor(private router:ActivatedRoute, private paymentService:PaymentService, private activatedRoutes:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.activatedRoutes.paramMap.subscribe({
      next: (params) => {
        const email = params.get('email')
        if (email) {
          this.getPaymentsByEmail(email);
        } else {
          this.getRecentlyLastTranscation()
        }
      }
    })
      
  }

  getPaymentsByEmail(email:string){
    this.paymentService.getPaymentsByUserEmail(email).subscribe({
      next:(data)=>{
        this.payments=data
      }
    })
  }

  getRecentlyLastTranscation(): void {
    this.paymentService.getRecentlyLastTranscation().subscribe(data => {
      this.payments = data
      console.log(this.payments);
    })
  }

  getAllPayments():void{
    this.paymentService.getAllPayments().subscribe(data=>{
      this.payments=data;
    })
  }

  getPaymentsByStatus(status: string): void {
    this.paymentService.getPaymentsByStatus(status).subscribe(data => {
      this.payments = data;
      console.log(this.payments);
    })
  }

  deletePaymentById(id: number): void {
    this.paymentService.deletePaymentById(id).subscribe({
      next: (data: Payment) => {
        console.log(data);
      }
    })
  }

}
