import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import { Hoteldto } from '../../../models/hoteldto';
import { HotelService } from '../../../services/hotel.service';
import { AmenityService } from '../../../services/amenity.service';
import { RoomService } from '../../../services/room.service';




@Component({
  selector: 'app-hotel-form',
  standalone: true,
  templateUrl: './hotel-form.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./hotel-form.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HotelFormComponent {
  hotelForm: FormGroup;
  hotel!:Hoteldto;
  

  constructor(private fb: FormBuilder,private hotelService:HotelService,private amenityService:AmenityService,private roomService:RoomService, private location:Location) {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', Validators.required],
      description: ['', [Validators.maxLength(500)]],
      amenities: this.fb.array([]),
      rooms: this.fb.array([]),
    });

  }

  get amenities(): FormArray {
    return this.hotelForm.get('amenities') as FormArray;
  }

  get rooms(): FormArray {
    return this.hotelForm.get('rooms') as FormArray;
  }

  addAmenity(): void {
    const amenityGroup = this.fb.group({
      amenity_id: ['', Validators.required],  // Ensure form control name matches what you're using in HTML
    });
    this.amenities.push(amenityGroup);
  }

  removeAmenity(index: number): void {
    this.amenities.removeAt(index);
  }

  addRoom(): void {
    const roomGroup = this.fb.group({
      room_type_id: ['', Validators.required],
      availability: [true],
      room_number:['',Validators.required]
    });
    this.rooms.push(roomGroup);
  }

  removeRoom(index: number): void {
    this.rooms.removeAt(index);
  }
  async onSubmit(){
  // if (this.hotelForm.valid) {
    this.hotel = this.hotelForm.value;
    console.log("in sub");
    

    // Create hotel
    const data=await this.hotelService.createHotel(this.hotel);
    if (data && data.hotel_id) {

      this.rooms.controls.forEach((roomcontrol,index)=>{
        this.createRoom(data.hotel_id,roomcontrol.value);
      })

      // Iterate through the list of amenities and call addAmenityToHotel
      this.amenities.controls.forEach((amenityControl, index) => {
        const amenity = amenityControl.value;
        // Pass only the amenity_id when adding to hotel
        this.addAmenityToHotel(data.hotel_id, amenity.amenity_id);  // Extract amenity_id
      });
      alert('Hotel and amenities successfully created');
    }
}

async addAmenityToHotel(hotel_id: number, amenity_id: number) {
  const data=await this.hotelService.addAmenityToHotel(hotel_id, amenity_id);
  if(data){
    console.log('Amenity added:', data);
  }else{
    console.log('Error adding amenity:', data);
  };
}

async createRoom(hotel_id:number,room:any){
  console.log(room);
  
  const data=await this.roomService.createRoom(hotel_id,room);
}

goBack(): void {
  this.location.back();
}

}
