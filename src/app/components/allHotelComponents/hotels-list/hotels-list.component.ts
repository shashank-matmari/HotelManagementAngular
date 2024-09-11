import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomtypeFormComponent } from '../../roomType/roomtype-form/roomtype-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Hotel } from '../../../models/hotel';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [CommonModule, RoomtypeFormComponent,ReactiveFormsModule,RouterModule],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.css'
})
export class HotelsListComponent {
  hotels: Hotel[] = []; // Array to hold hotels
  loading = false; // Loading indicator

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchHotels(); // Fetch hotels on component initialization
  }

  // Method to fetch all hotels
  fetchHotels(): void {
    this.loading = true; // Start loading
    this.hotelService.getAllHotels()
      .then((hotels: Hotel[]) => {
        this.hotels = hotels; // Assign fetched hotels
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      })
      .finally(() => {
        this.loading = false; // Stop loading
      });
  }

  // Method to delete a hotel by its ID
  deleteHotel(hotel_id: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.loading = true; // Start loading
      this.hotelService.deleteHotel(hotel_id.toString())
        .then(() => {
          this.fetchHotels(); // Refresh hotel list after deletion
        })
        .catch(error => {
          console.error('Error deleting hotel:', error);
        })
        .finally(() => {
          this.loading = false; // Stop loading
        });
    }
  }

  // Navigate to edit page for hotel
  editHotel(hotel_id: number): void {
    this.router.navigate(['/hotel/details/', hotel_id]);
  }

  // Navigate back
  goBack(): void {
    this.router.navigate(['/']); // Adjust the route as needed
  }
}
