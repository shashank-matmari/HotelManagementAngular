import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { Hotel } from '../../../models/hotel';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {

  reservationForm: FormGroup;
  hotel!: Hotel;
  room!: Room;
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {
    this.reservationForm = this.fb.group({
      hotel_name: ['', Validators.required],
      guest_name: ['', Validators.required],
      guest_phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      guest_email: ['', [Validators.required, Validators.email]],
      check_in_date: ['', Validators.required],
      check_out_date: ['', Validators.required],
      room_id: ['', Validators.required],
      amount: [0, Validators.required]
    });
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      if (role === "User") {
        const user = localStorage.getItem('user');
        if (user) {
          this.updateUserDetaills(JSON.parse(user));
        }
      }
    }
    this.activatedRoute.paramMap.subscribe({
      next: () => {
        if (typeof localStorage !== 'undefined') {
          const bookingDetails = JSON.parse(localStorage.getItem('selectedHotel')!);
          if(bookingDetails==null){
            this.router.navigate(['/'])
          }
          const room_id = bookingDetails.room_id;
          const hotel_id = bookingDetails.hotel_id;
          const check_in_date=bookingDetails.check_in_date;
          const check_out_date=bookingDetails.check_out_date;
          if (hotel_id && room_id && check_in_date && check_out_date) {
            this.hotelAndRoomDetails(bookingDetails);
          }
        }
      }
    });
  }

  public hotelAndRoomDetails(bookingDetails:any){
    this.roomService.getRoomById(bookingDetails.room_id).then((data)=>{
      if(bookingDetails.hotel_id===data.hotel.hotel_id){
        this.hotel=data.hotel;
        this.room=data
        this.updateFormValues(bookingDetails);
        this.calculateTotalAmount();
      }
    })
  }

  // public hotelAndRoomDetails(room_id: number) {
  //   this.hotelService.hotel$.subscribe({
  //     next: (hotel) => {
  //       if (hotel) {
  //         this.hotel = hotel;
  //         this.roomService.room$.subscribe({
  //           next: (room) => {
  //             if (room) {
  //               this.room = room;
  //               console.log(hotel, room);

  //               this.updateFormValues();
  //               this.calculateTotalAmount();
  //             }
  //           },
  //           error: (err) => console.error('Failed to load room details', err)
  //         });
  //       }
  //     },
  //     error: (err) => console.error('Failed to load hotel details', err)
  //   });
  // }

  updateFormValues(bookingDetails:any) {
    this.reservationForm.patchValue({
      hotel_name: this.hotel.name,
      room_id: this.room.room_id,
      check_in_date:bookingDetails.check_in_date,
      check_out_date:bookingDetails.check_out_date,
    });
  }

  calculateTotalAmount() {
    const checkInDate = new Date(this.reservationForm.value.check_in_date);
    const checkOutDate = new Date(this.reservationForm.value.check_out_date);
    const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
    this.totalAmount = this.room.room_type.price_per_night * nights;
    this.reservationForm.patchValue({ amount: this.totalAmount });
  }

  updateUserDetaills(user:any){
    console.log(user);
    
    this.reservationForm.patchValue({
      guest_name:user.user_name,
      guest_email:user.email
    })
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value).subscribe({
        next: (data) => {
          if (typeof localStorage !== 'undefined') {
            const bookingDetails = JSON.parse(localStorage.getItem('selectedHotel')!);
            if(bookingDetails==null){
              this.router.navigate(['/'])
            }
            bookingDetails.amount=this.totalAmount;
            localStorage.setItem('selectedHotel',JSON.stringify(bookingDetails));
            this.router.navigate(['/payment/', data.reservation_id]);
          }
        },
        error: (error) => console.error('Failed to create reservation', error)
      });
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.location.back();
  }

}
