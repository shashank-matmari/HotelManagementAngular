import { Component, Input } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { HotelDetailsComponent } from "../hotel-details/hotel-details.component";
import { Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [HotelDetailsComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent {

  @Input({required:true}) hotel!: Hotel;

  constructor(private route:Router, private hotelService:HotelService){}

  openHotelDetails(hotel_id:number){
    this.hotelService.onSelect(this.hotel)
    this.route.navigate(["/hotel/",hotel_id])
  }

}
