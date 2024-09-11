import { ChangeDetectorRef, Component } from '@angular/core';
import { HotelComponent } from "../hotel/hotel.component";
import { CommonModule } from '@angular/common';
import { HotelService } from '../../../services/hotel.service';
import { Router } from '@angular/router';
import { Hotel } from '../../../models/hotel';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotelComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  hotels!: Hotel[];
  filteredHotels!: Hotel[]; // To store filtered hotels
  currentPage = 1;
  hotelsPerPage = 20;
  isLoading = false;

  images = [
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

  constructor(private hotelService: HotelService, private route: Router, private cdr: ChangeDetectorRef, private loginService: LoginService) { }

  ngOnInit(): void {
    // if (typeof localStorage!=='undefined') {
    //   if(localStorage.getItem('user')==null){
    //   this.route.navigate(['/landing']);
    //   }
    // }
    this.loadHotels();
    this.hotelService.searchQuery$.subscribe(query => {
      this.filterHotelsByName(query);
    });
  }

  get paginatedHotels() {
    if (!this.hotels) {
      return [];
    }
    const startIndex = (this.currentPage - 1) * this.hotelsPerPage;
    return this.filteredHotels.slice(startIndex, startIndex + this.hotelsPerPage).map(hotel => {
      return {
        ...hotel,
        img: this.getRandomImage()
      };
    });
  }

  // Updated toLoad method to use async/await
  async loadHotels() {
    this.isLoading = true; // Start the loader
    try {
      const hotels = await this.hotelService.getAllHotels();
      this.hotels = hotels || []; // Default to an empty array if undefined
      this.filteredHotels = this.hotels;
    } catch (error) {
      console.error(error);
      this.hotels = [];
      this.filteredHotels = [];
    } finally {
      this.isLoading = false; // Stop the loader
      this.cdr.detectChanges(); // Trigger change detection manually after data is loaded
    }
  }

  nextPage() {
    if ((this.currentPage * this.hotelsPerPage) < this.hotels.length) {
      this.currentPage++;
      this.cdr.detectChanges();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.detectChanges();
    }
  }

  async deleteHotel(hotel_id: string) {
    try {
      await this.hotelService.deleteHotel(hotel_id);
      await this.loadHotels(); // Reload hotels after deletion
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  }

  updateHotel(hotel_id: string) {
    this.route.navigate(['/', hotel_id]);
  }


  filterHotelsByName(query:string){
    if (query.trim() === '') {
      this.filteredHotels = this.hotels;
    } else {
      this.filteredHotels = this.hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  // Filter hotels by location
  async filterHotelsByLocation(location: string | null) {
    this.isLoading = true;
    try {
      if (location) {
        this.filteredHotels = await this.hotelService.filterByLocation(location) as Hotel[];
      } else {
        this.filteredHotels = this.hotels;
      }
      this.currentPage = 1; // Reset to first page after filtering
    } catch (error) {
      console.error('Error filtering hotels:', error);
      this.filteredHotels = this.hotels; // Or [] if you want to reset to empty on error
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Trigger change detection after filtering
    }
  }


  getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
