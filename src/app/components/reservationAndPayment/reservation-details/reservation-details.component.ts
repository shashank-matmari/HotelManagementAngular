import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AllDetails } from '../../../models/all-details';
import { Reservation } from '../../../models/reservation';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {

  reservationId!: string
  reservation!: AllDetails
  amenitiesDetails: AllDetails[] = []
  detailsreservation!: Reservation

  constructor(private activatedRoute: ActivatedRoute, private reservationService: ReservationService, private location:Location) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.activatedRoute.paramMap.subscribe(params => {
      this.reservationId = params.get('reservationId')!
      this.reservationService.getAllDetailsByReservationId(parseInt(this.reservationId)).subscribe({
        next: (data) => {
          this.reservation = data[0]
          this.amenitiesDetails = data
        }
      })
    })
  }


  goBack(): void {
    this.location.back();
  }

}
