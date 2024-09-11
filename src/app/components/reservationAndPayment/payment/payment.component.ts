

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/payment.service';
import { PopUpComponent } from "../../headersAndFooters/pop-up/pop-up.component";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, PopUpComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  paymentMethods: string[] = ['Credit Card', 'Debit Card', 'Cash', 'Other'];
  //paymentService: any;
  payments: Payment[] = [];
  newPayment!: Payment
  reservationId!: number
  amount:number=0

  // Popup state
  showPopup = false;
  popupTitle = '';
  popupMessage = '';

  private paymentStatus: string = 'Pending';

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private router: Router, private route: ActivatedRoute) {

    route.paramMap.subscribe(params => {
      this.reservationId = parseInt(params.get('reservation_id')!)
      if (typeof localStorage !== 'undefined') {
        const bookingDetails = JSON.parse(localStorage.getItem('selectedHotel')!);
        if(bookingDetails==null){
          this.router.navigate(['/'])
        }
        this.amount=parseInt(bookingDetails.amount);
      }
      this.paymentForm = this.fb.group({
        reservation_id: [this.reservationId],
        payment_type: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2}|[1-9]{2})$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
        amount: [this.amount, Validators.required],
        notes: ['', Validators.maxLength(255)]
      })
    })
  }

  ngOnInit() {

  }


  onSubmit(isPayNow: boolean) {

    this.paymentStatus = isPayNow ? 'Paid' : 'Pending';
    this.newPayment = this.paymentForm.value;
    this.newPayment.payment_status = this.paymentStatus;
    this.newPayment.payment_date = new Date();

    // If using specific form controls, you can add conditions here
    const payment_method = this.paymentForm.get('payment_type')?.value || null;
    if (payment_method === 'Credit Card' || payment_method ==='Debit Card') {
      this.paymentService.createPayment(this.newPayment).subscribe({
        next: (response: any) => {
          this.popupTitle = 'Thank You!';
          this.popupMessage = 'Have a happy stay!';
          this.showPopup = true
          localStorage.removeItem('selectedHotel');
        },
        error: (err) => {
          this.popupTitle = 'Error!';
          this.popupMessage = 'There was a technical error. Please try again later.';
          this.showPopup = true;
        }
      });
    }

    if (payment_method === 'Cash' || payment_method === 'other') {
      this.paymentService.createPayment(this.newPayment).subscribe({
        next: (response: any) => {
          this.popupTitle = 'Thank You!';
          this.popupMessage = 'Have a happy stay!';
          this.showPopup = true;
          localStorage.removeItem('selectedHotel');
        },
        error: (err) => {
          this.popupTitle = 'Error!';
          this.popupMessage = 'There was a technical error. Please try again later.';
          this.showPopup = true;
        }
      });
    }

  }


  getPaymentById(id: number): void {
    this.paymentService.getPaymentById(id).subscribe({
      next: (data: Payment) => {
        console.log(data);
        this.paymentForm.patchValue(data)
      }
    })
  }

  getpaymentTotalRevenue(): void {
    this.paymentService.getpaymentTotalRevenue().subscribe({
      next: (data: Payment) => {
        console.log(data);
      }
    })
  }



}
