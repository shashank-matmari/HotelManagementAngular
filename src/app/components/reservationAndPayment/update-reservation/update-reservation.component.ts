import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-reservation.component.html',
  styleUrl: './update-reservation.component.css'
})
export class UpdateReservationComponent{

  reservation!: Reservation
  reservation_id!: string
  reservationForm!: FormGroup

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private reservationService: ReservationService, private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params)
      this.reservation_id = params.get('reservationId')!
      console.log(this.reservation_id)
      this.reservationService.getAllDetailsByReservationId(parseInt(this.reservation_id)).subscribe({
        next: (data) => {
          this.reservation = data[0]
          console.log(this.reservation)
          this.reservationForm = this.fb.group({
            hotel_name: [this.reservation.hotel_name],
            guest_name: [this.reservation.guest_name],
            guest_phone: [this.reservation.guest_phone],
            guest_email: [this.reservation.guest_email],
            check_in_date: [this.reservation.check_in_date],
            check_out_date: [this.reservation.check_out_date],
            room_id: [this.reservation.room_id],
            amount: [this.reservation.amount]
          })
        }
      })
    })
  }


  onSubmit(){
    this.reservationService.updateReservation(parseInt(this.reservation_id),this.reservationForm.value).subscribe({
      next:(data) =>  {
        // console.log(data)
        alert("Updated Successfully")
        this.router.navigate([''])
      }
    })
  }

  goback(){
    this.router.navigate([''])
  }

}
