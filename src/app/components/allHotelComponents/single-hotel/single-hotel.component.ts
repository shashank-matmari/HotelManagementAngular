import { Component } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { Router } from '@angular/router';
import { Amenity } from '../../../models/amenity';
import { Room } from '../../../models/room';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-single-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-hotel.component.html',
  styleUrl: './single-hotel.component.css'
})
export class SingleHotelComponent {
  hotel!: Hotel; // Current hotel details
  hotelForm!: FormGroup; // Form to update hotel details
  roomForm!: FormGroup; // Form to add a new room
  amenitiesForm!: FormGroup; // Form to add amenities
  loading = false; // Loading indicator
  hotelId!: number; // Store hotel id from route parameters

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService:RoomService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.paramMap.get('hotel_id')!; // Get hotel ID from URL
    this.getHotelDetails();
    this.initializeForms();
  }

  // Initialize forms
  initializeForms(): void {
    this.hotelForm = this.fb.group({
      name: [''],
      location: [''],
      description: ['']
    });

    this.roomForm = this.fb.group({
      room_number: [''],
      room_type_id: [''],
      });

    this.amenitiesForm = this.fb.group({
      amenity_id: ['']
    });
  }

  // Fetch hotel details by hotelId
  getHotelDetails(): void {
    this.loading = true;
    this.hotelService.getHotelById(this.hotelId)
      .then((hotel: Hotel) => {
        this.hotel = hotel;
        this.hotelForm.patchValue({
          name: hotel.name,
          location: hotel.location,
          description: hotel.description
        });
      })
      .catch(error => {
        console.error('Error fetching hotel details:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // Update hotel details
  updateHotel(): void {
    if (this.hotelForm.valid) {
      const hotel = this.hotelForm.value;
      this.loading = true;
      console.log(hotel);
      
      this.hotelService.updateHotel(this.hotelId, hotel)
        .then(() => {
          alert('Hotel details updated successfully');
          this.getHotelDetails(); // Refresh the hotel details
        })
        .catch(error => {
          console.error('Error updating hotel:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  // Add a new room to the hotel
  addRoom(): void {
    if (this.roomForm.valid) {
      const newRoom: Room = this.roomForm.value;
      this.loading = true;
      this.roomService.createRoom(this.hotel.hotel_id,newRoom).then(()=>{
        alert('Room added successfully');
        this.getHotelDetails();
      })
    }
  }

  // Add a new amenity to the hotel
  addAmenity(): void {
    if (this.amenitiesForm.valid) {
      const newAmenity=this.amenitiesForm.value;
      this.loading = true;
      this.hotelService.addAmenityToHotel(this.hotelId, newAmenity.amenity_id) // Call API to add amenity
        .then(() => {
          alert('Amenity added successfully');
          this.getHotelDetails(); // Refresh hotel details after adding amenity
        })
        .catch(error => {
          console.error('Error adding amenity:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  // Navigate back
  goBack(): void {
    this.router.navigate(['/hotel/all']); // Adjust the route as needed
  }
}
