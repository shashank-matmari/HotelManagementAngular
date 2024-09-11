import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { CommonModule, Location } from '@angular/common';
import { Room } from '../../../models/room';
import { HotelService } from '../../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomCardComponent } from "../room-card/room-card.component";
import { Amenities } from '../../../models/amenities';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, FormsModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent {
  hotel!: Hotel;
  hotel_id!: number;
  hotel_amenities!: Amenities[]
  rooms!: Room[];
  filteredRooms!: Room[];
  currentPage = 1;
  roomsPerPage = 10;
  selectedRoomId: number | null = null;
  checkinDate: string = '';
  checkoutDate: string = '';
  searchQuery: string = '';



  constructor(private hotelService: HotelService, private activeRoute: ActivatedRoute, private router: Router, private roomService: RoomService, private location:Location) { }

  images = [
    'assets/images/rooms/room 1.jpg',
    'assets/images/rooms/room 2.jpg',
    'assets/images/rooms/room 3.jpg',
    'assets/images/rooms/room 4.jpg',
    'assets/images/rooms/room 5.jpg',
    'assets/images/rooms/room 6.jpg',
    'assets/images/rooms/room 7.jpg',
    'assets/images/rooms/room 8.jpg',
    'assets/images/rooms/room 9.jpg',
    'assets/images/rooms/room 10.jpg',
    'assets/images/rooms/room 11.jpg',
    'assets/images/rooms/room 12.jpg',
    'assets/images/rooms/room 13.jpg',
    'assets/images/rooms/room 14.jpg',
    'assets/images/rooms/room 15.jpg',
    'assets/images/rooms/room 16.jpg',
    'assets/images/rooms/room 17.jpg',
    'assets/images/rooms/room 18.jpg',
    'assets/images/rooms/room 19.jpg',
    'assets/images/rooms/room 20.jpg'
  ];

  hotel_images = [
    'assets/images/hotels/hotel1.jpeg',
    'assets/images/hotels/hotel2.jpeg',
    'assets/images/hotels/hotel3.jpeg',
    'assets/images/hotels/hotel4.jpg',
    'assets/images/hotels/hotel6.jpg',
    'assets/images/hotels/hotel7.jpg',
    'assets/images/hotels/hotel8.jpg',
    'assets/images/hotels/hotel9.jpg',
    'assets/images/hotels/hotel10.jpg',
    'assets/images/hotels/hotel12.jpg',
    'assets/images/hotels/hotel13.jpg',
  ];

  async ngOnInit() {
    if(typeof localStorage!=='undefined'){
      const details=JSON.parse(localStorage.getItem('selectedHotel')!);
      if(details){
        this.checkinDate=details.check_in_date;
        this.checkoutDate=details.check_out_date;
      }
    }
    this.activeRoute.paramMap.subscribe(async params => {
      this.hotel_id = parseInt(params.get('hotel_id')!, 10);
      try {
        const data = await this.hotelService.getHotelById(this.hotel_id);

        this.hotel = {
          ...data,
          img: this.getRandomHotelImg(),
        };
        this.hotel_amenities = this.hotel.amenities;
        this.getAllRooms();
      } catch (error) {
        console.error('Failed to load hotel details:', error);
      }
    });
  }

  getAllRooms() {
    this.rooms = this.hotel.rooms;
    this.filteredRooms = this.rooms.map(room => {
      return {
        ...room,
        img: this.getRandomImage()
      };
    });
  }

  async filterRooms() {
    const today = new Date().toISOString().split('T')[0];

    if (!this.checkinDate || !this.checkoutDate) {
      alert('Check-in and check-out dates are required.');
      this.checkinDate = '';
      this.checkoutDate = '';
      return;
    }
    if (this.checkinDate < today || this.checkoutDate < today) {
      alert('Check-in and check-out dates are invalid');
      this.checkinDate = '';
      this.checkoutDate = '';
      return;
    }
    if (this.checkinDate >= this.checkoutDate) {
      alert('Check-in and check-out dates are invalid');
      this.checkinDate = '';
      this.checkoutDate = '';
      return;
    }
    try {
      const rooms = await this.roomService.getRoomsAvailableByDateRange(this.hotel.hotel_id, this.checkinDate, this.checkoutDate);
      if (typeof localStorage !== 'undefined') {
        const bookingDetails = JSON.parse(localStorage.getItem('selectedHotel')!);
        if (bookingDetails == null) {
          this.router.navigate(['/'])
        }
        bookingDetails.check_in_date = this.checkinDate;
        bookingDetails.check_out_date = this.checkoutDate;
        localStorage.setItem('selectedHotel', JSON.stringify(bookingDetails));
        // Adding image to each room
        this.filteredRooms = rooms.map(room => ({
          ...room,
          img: this.getRandomImage(),
        }));
      }
    } catch (error) {
      console.error('Failed to load room details:', error);
    }
  }

  get paginatedRooms() {
    if (!this.filteredRooms) {
      return [];
    }
    const startIndex = (this.currentPage - 1) * this.roomsPerPage;
    return this.filteredRooms.slice(startIndex, startIndex + this.roomsPerPage);
  }

  getRandomHotelImg() {
    return this.hotel_images[Math.floor(Math.random() * this.hotel_images.length)];
  }

  getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  onToggleRoom(roomId: number) {
    this.selectedRoomId = this.selectedRoomId === roomId ? null : roomId;
  }

  goBack(): void {
    this.location.back();
  }

}
