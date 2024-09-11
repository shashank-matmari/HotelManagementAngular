import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllReservationsComponent } from '../all-reservations/all-reservations.component';
import { Reservation } from '../../../models/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { PopUpComponent } from "../../headersAndFooters/pop-up/pop-up.component";

@Component({
  selector: 'app-single-reservation',
  standalone: true,
  imports: [CommonModule, PopUpComponent],
  templateUrl: './single-reservation.component.html',
  styleUrl: './single-reservation.component.css'
})
export class SingleReservationComponent {

  @Input({ required: true }) reservation!: Reservation
  role!:string

  // Popup state
  showPopup = false;
  popupTitle = '';
  popupMessage = '';

  isClicked = false;

  @Input() selectedIndex!: number
  @Output() delReservation: EventEmitter<number> = new EventEmitter<number>()

  constructor(private router: Router, private reservationService: ReservationService, private allReservation: AllReservationsComponent) { }

  ngOnInit(){
    if(typeof localStorage!=='undefined'){
      const role=localStorage.getItem('role')
      if(role){
        this.role=role
      }
    }
  }

  checkRole():boolean{
    if(this.role==='User'){
      console.log("hello");
      
      return true
    }else{
      return false
    }
  }

  goToReservationDetails(reservationId: number) {
    this.router.navigate(['reservation/details/', reservationId])
    // console.log(this.reservationService.getAllDetailsByReservationId(reservationId))
  }

  updateReservation(reservationId: number) {
    this.router.navigate(['reservation/update/', reservationId])

  }

  deleteReservation(reservationId: number) {
    this.popupTitle = 'Error!';
    this.popupMessage = 'Due to RBI guidelines payments cannot be deleted';
    this.showPopup = true;
  }

  @HostListener('click', ['$event'])
  onCardClick(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    this.isClicked = !this.isClicked;
  }

  get paymentImage() {
    return 'assets/images/Paid.jpg'
  }

  giveFeedback(reservation_id:number){
    this.router.navigate(["feedback/create/",reservation_id])
  }


}
